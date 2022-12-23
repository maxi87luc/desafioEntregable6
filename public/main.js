const client = io();



client.on('products-update', (data) => {
    
    const tbody = document.getElementById('tbody');
    let tr = ""
    const templateTr = Handlebars.compile(`
        <tr>
            <th scope="row">{{id}}</th>
            <td>{{title}}</td>
            <td>{{price}}</td>
            <td><img src="{{thumbnail}}" style="width: 30px" alt="">  </td>
        </tr>
    `);
    
  
    data.forEach((product)=>{
        
        tr = `
        ${tr}
        ${templateTr(product)}
        `      
        tbody.innerHTML = tr;   
    })

 
    

});

client.on('messages-update', (data) => {	

    console.log(data)
    
    const messagesContainer = document.getElementById('messages-container')
    let li = ""
    const templateLi = Handlebars.compile(`
    <li class="list-group-item"><strong style="color: blue">{{email}}:</strong><p style="color: brown">{{date.DD}}/{{date.MM}}/{{date.YY}} {{date.hh}}:{{date.mm}}</p><p style="font-style: italic; color: green">{{message}}</p></li>
    `)  
    
    

    data.forEach((message)=>{
        li = `
            ${li}
            ${templateLi(message)}
        `
        messagesContainer.innerHTML = li
    })
})


const productForm = document.getElementById('productForm');


productForm.addEventListener('submit', (e)=>{
    
    e.preventDefault();
    const title = productForm[0].value;
    const price = parseInt(productForm[1].value);
    const thumbnail = productForm[2].value;
    messageToSend = {title, price, thumbnail};
        
    client.emit('producto', messageToSend);
         

})

const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const email = messageForm[0].value;
    const message = messageForm[1].value;
    messageToSend = {email, message}

    client.emit('mensaje', messageToSend)

})






