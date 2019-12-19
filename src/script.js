let userList;
fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
.then(users => {
    userList=users;
    fillUsers(users);
});


function findById(userId) {
    for(user in userList){
        if(userList[user]['id']==userId){
            return user;
        }
    }
}


function fillUsers(users) {
    let output;
    let row;
    let table = document.getElementById('users');
    table.innerHTML=""
    output=`
    <tr>
      <th onclick="sortColumn('name')">Name</th>
      <th onclick="sortColumn('email')">E-mail</th>
      <th onclick="sortColumn('username')">Username</th>
      <th id="button">Delete</th>
    </tr>`
    table.innerHTML +=output;
    users
        .forEach(u => {
        row = `<tr id="tr" >`;
    row += `<td class="tdClass">${u.name}</td>`;
    row += `<td class="tdClass">${u.email}</td>`;
    row += `<td class="tdClass">${u.username}</td>`;
    row+=`<td id="del"><input class="deleteButton" type="button" value="DELETE" onclick="deleteTr(${u.id})"></td>`
    row += `</tr>`;
    table.innerHTML += row;
})
}


function filterUsers() {
    let x = document.getElementById('inputValue').value;
    let filter = document.getElementById('filter');
    let usersRow = document.getElementById('users').getElementsByTagName('tr');
    let search=filter[filter.selectedIndex].value;
    let column;
    if(search===('name')){
        column=0;
    } else if(search===('email')){
        column=1;
    } else if(search===('username')){
        column=2;
    }
    for (let i = 1; i < usersRow.length; i++) {
        let userTd = usersRow[i].getElementsByTagName('td');
        if (!userTd[column].innerText.toLowerCase().includes(x.toLowerCase())) {
            usersRow[i].parentElement.style.display = 'none';
        } else {
            usersRow[i].parentElement.style.display = 'table-row-group';
        }
    }
}

function deleteTr(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method: 'DELETE'
    })
    user=findById(id);
    userList.splice(user,1);
    fillUsers(userList);
}

function sortColumn(columnName){
    fillUsers(userList.sort(function(cur, next){
        if(cur[columnName]<next[columnName]) return -1;
        else if(cur[columnName]>next[columnName]) return 1;
        return 0;
    }));
}
