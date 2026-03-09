const supabaseUrl = "https://dpdhqeokdjispkkidzdl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZGhxZW9rZGppc3Bra2lkemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDI0OTYsImV4cCI6MjA4ODU3ODQ5Nn0.fLG_QfOz3OScdm_9ZW6qDVT7MnvgkJbxn4Ff0sUekA0";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function loadMessages() {

const { data, error } = await supabaseClient
.from("messages")
.select("*")
.order("id", { ascending: false });

if (error) {
console.error("Error loading messages:", error);
return;
}

const tableBody = document.querySelector("#messagesTable tbody");
tableBody.innerHTML = "";

document.getElementById("messageCount").innerText = data.length;

data.forEach(msg => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${msg.name}</td>
<td>${msg.email}</td>
<td>${msg.message}</td>
<td><button onclick="deleteMessage(${msg.id})">Delete</button></td>
`;

tableBody.appendChild(row);

});

}

async function deleteMessage(id) {

const { error } = await supabaseClient
.from("messages")
.delete()
.eq("id", id);

if (error) {
alert("Delete failed");
console.error(error);
} else {
loadMessages();
}

}

loadMessages();
