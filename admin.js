// ===============================
// SUPABASE CONNECTION
// ===============================

const supabaseUrl = "PUT-YOUR-SUPABASE-URL";
const supabaseKey = "PUT-YOUR-ANON-KEY";

const supabase = window.supabase.createClient(
supabaseUrl,
supabaseKey
);


// ===============================
// LOAD MESSAGES
// ===============================

async function loadMessages(){

const { data, error } = await supabase
.from("messages")
.select("*")
.order("created_at",{ascending:false});

if(error){
console.log(error);
return;
}

const table = document.querySelector("#messagesTable tbody");

table.innerHTML="";

data.forEach(msg=>{

table.innerHTML+=`
<tr>
<td>${msg.name}</td>
<td>${msg.email}</td>
<td>${msg.message}</td>
<td>${new Date(msg.created_at).toLocaleString()}</td>
<td>
<button class="deleteBtn" onclick="deleteMessage(${msg.id})">
Delete
</button>
</td>
</tr>
`;

});

}


// ===============================
// DELETE MESSAGE
// ===============================

async function deleteMessage(id){

const confirmDelete = confirm("Delete this message?");

if(!confirmDelete) return;

await supabase
.from("messages")
.delete()
.eq("id",id);

loadMessages();
loadStats();

}


// ===============================
// LOAD STATISTICS
// ===============================

async function loadStats(){

const { count:msgCount } = await supabase
.from("messages")
.select("*",{count:"exact",head:true});

const { count:visitCount } = await supabase
.from("visitors")
.select("*",{count:"exact",head:true});

document.getElementById("messageCount").innerText = msgCount;
document.getElementById("visitorCount").innerText = visitCount;

}


// ===============================
// AUTO REFRESH
// ===============================

setInterval(()=>{

loadMessages();
loadStats();

},5000);


// ===============================
// FIRST LOAD
// ===============================

loadMessages();
loadStats();
