const root = document.getElementById('root')
const domain = 'http://localhost:1337'

const loginPage = /*html*/`
<form class="login-form" onsubmit="loginSubmit(event)">
<div>
  <label for="login" class="form-label">login</label>
  <input type="text" class="form-control" id="login" aria-describedby="loginHelp" name = "login">
</div>
<div>
  <label for="password" class="form-label">Password</label>
  <input type="password" class="form-control" id="password" name = "password">
</div>
<button type="submit" class="btn btn-primary btn-login">моргни если клоун</button>
</form>`

function ordersPage(orders = []) {
    return /* html*/ `
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Handle2</th>
      <th scope="col">Handle3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td colspan="2">AWFAWFFAWrd</td>
      <td>@tl</td>
    </tr>
  </tbody>
</table>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">nick</th>
          <th scope="col">bunker's numb</th>
          <th scope="col">way of </th>
          <th scope="col">vsem ^#^</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map((order) => {
            return /* html */`
            <tr>
            <th scope="row">${order.id}</th>
            <td>${order.nick}</td>
            <td>${order.idbunkera}</td>
            <td>${order.way}</td>
            <td>${order.info}</td>
            </tr>
            `
        })}
      </tbody>
    </table>
    `
}


root.innerHTML = loginPage;

async function loginSubmit(event) {
    event.preventDefault()
    const form = event.target
    const loginValue = form.login.value;
    const passwordValue = form.password.value;
    const response = await fetch(`${domain}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: loginValue,
            password: passwordValue
        })
    })
    if (response.ok) {
        const tokenInf = await response.json()
        localStorage.setItem('Token', tokenInf.token)
        renderOrders()
    }
}

async function renderOrders() {
    const token = localStorage.getItem('Token')
    if (token){
      const response = await fetch(`${domain}/api/sadway`, {
          headers: {
              'Authorization': token 
          }
      })
      if (response.ok) {
          const orders = await response.json()
          root.innerHTML = ordersPage(orders)
      } else {
        root.innerHTML = loginPage
      }
    } else{
      root.innerHTML = loginPage
    }
}