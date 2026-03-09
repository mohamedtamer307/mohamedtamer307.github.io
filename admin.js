async function loadMessages(){

const { data } = await supabaseClient
.from("messages")
.select("*")
.order("created_at",{ascending:false});

const table = document.querySelector("#messagesTable tbody");

table.innerHTML="";

data.forEach(msg=>{

table.innerHTML+=`
<tr>
<td>${msg.name}</td>
<td>${msg.email}</td>
<td>${msg.message}</td>
<td><button onclick="deleteMessage(${msg.id})">Delete</button></td>
</tr>
`;

});

}

async function deleteMessage(id){

await supabaseClient
.from("messages")
.delete()
.eq("id",id);

loadMessages();

}

async function loadStats(){

const { count:msgCount } = await supabaseClient
.from("messages")
.select("*",{count:"exact",head:true});

const { count:visitCount } = await supabaseClient
.from("visitors")
.select("*",{count:"exact",head:true});

document.getElementById("messageCount").innerText = msgCount;
document.getElementById("visitorCount").innerText = visitCount;

}

loadMessages();
loadStats();