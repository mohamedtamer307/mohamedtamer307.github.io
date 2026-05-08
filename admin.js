
const supabaseUrl = "https://dpdhqeokdjispkkidzdl.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZGhxZW9rZGppc3Bra2lkemRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDI0OTYsImV4cCI6MjA4ODU3ODQ5Nn0.fLG_QfOz3OScdm_9ZW6qDVT7MnvgkJbxn4Ff0sUekA0";

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

/* ========================= */
/* LOAD MESSAGES */
/* ========================= */

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
<td>${msg.name || ""}</td>

<td>${msg.email || ""}</td>

<td>${msg.message || ""}</td>

<td>
<button onclick="deleteMessage(${msg.id})">
Delete
</button>
</td>
`;

tableBody.appendChild(row);

});

}

/* ========================= */
/* DELETE MESSAGE */
/* ========================= */

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

/* ========================= */
/* FORMAT DURATION */
/* ========================= */

function formatDuration(seconds){

if(!seconds) return "-";

const mins = Math.floor(seconds / 60);

const secs = seconds % 60;

if(mins <= 0){
return `${secs}s`;
}

return `${mins}m ${secs}s`;

}

/* ========================= */
/* LOAD VISITORS */
/* ========================= */

async function loadVisitors(){

const { data, error } = await supabaseClient
.from("visitors")
.select("*")
.order("id", { ascending: false });

if(error){

console.error("Error loading visitors:", error);

return;

}

document.getElementById("visitorCount").innerText = data.length;

const visitorsBody =
document.querySelector("#visitorsTable tbody");

visitorsBody.innerHTML = "";

data.forEach(visitor => {

const row = document.createElement("tr");

row.innerHTML = `

<td>${visitor.id || "-"}</td>

<td>${visitor.ip || "-"}</td>

<td>${visitor.country || "-"}</td>

<td>${visitor.city || "-"}</td>

<td>${visitor.device_type || "-"}</td>

<td>${visitor.os || "-"}</td>

<td style="max-width:250px;">
${visitor.browser || "-"}
</td>

<td>${visitor.language || "-"}</td>

<td>${visitor.screen_size || "-"}</td>

<td>${visitor.page || "-"}</td>

<td>
${formatDuration(visitor.duration_seconds)}
</td>

<td>
${visitor.enter_time
? new Date(visitor.enter_time).toLocaleString()
: "-"}
</td>

<td>
${visitor.exit_time
? new Date(visitor.exit_time).toLocaleString()
: "-"}
</td>

`;

visitorsBody.appendChild(row);

});

}

/* ========================= */
/* INIT */
/* ========================= */

loadMessages();

loadVisitors();

