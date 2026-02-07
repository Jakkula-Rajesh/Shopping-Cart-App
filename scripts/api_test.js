const fs = require('fs');
const base = 'http://localhost:5001/api';

async function run() {
  const out = { start: new Date().toISOString(), steps: {} };
  try {
    const h = await (await fetch(`${base}/health`)).json().catch(e=>null);
    out.steps.health = h;
  } catch (e) { out.steps.health = { error: String(e) }; }

  try {
    const items = await (await fetch(`${base}/items`)).json().catch(e=>null);
    out.steps.items = items;
  } catch (e) { out.steps.items = { error: String(e) }; }

  const username = 'tester' + Math.floor(Math.random()*9000+1000);
  const password = 'Pass123!';
  try {
    const res = await fetch(`${base}/users`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ username, password }) });
    out.steps.create = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
  } catch (e) { out.steps.create = { error: String(e) }; }

  try {
    const res = await fetch(`${base}/users/login`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ username, password }) });
    out.steps.login = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
  } catch (e) { out.steps.login = { error: String(e) }; }

  const token = out.steps.login?.token;
  if (token && out.steps.items && out.steps.items.length>0) {
    try {
      const firstId = out.steps.items[0]._id;
      const res = await fetch(`${base}/carts`, { method: 'POST', headers: { 'content-type':'application/json', Authorization: token }, body: JSON.stringify({ itemId: firstId }) });
      out.steps.addToCart = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
    } catch (e) { out.steps.addToCart = { error: String(e) }; }

    try {
      const res = await fetch(`${base}/carts/user/cart`, { headers: { Authorization: token } });
      out.steps.cart = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
    } catch (e) { out.steps.cart = { error: String(e) }; }

    try {
      const cartId = out.steps.cart?._id;
      const res = await fetch(`${base}/orders`, { method: 'POST', headers: { 'content-type':'application/json', Authorization: token }, body: JSON.stringify({ cartId }) });
      out.steps.checkout = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
    } catch (e) { out.steps.checkout = { error: String(e) }; }

    try {
      const res = await fetch(`${base}/orders/user/orders`, { headers: { Authorization: token } });
      out.steps.orders = await (res.ok ? res.json() : { status: res.status, text: await res.text() });
    } catch (e) { out.steps.orders = { error: String(e) }; }
  }

  fs.writeFileSync('api_output.json', JSON.stringify(out, null, 2));
  console.log('WROTE api_output.json');
}

run().catch(e=>{ console.error(e); process.exit(1); });
