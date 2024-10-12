const x=document.getElementById("input-box")

x.value = "";

const bt=document.getElementById("button")

bt.addEventListener("click",()=>{

    const list=document.getElementById("list")
    const items=document.getElementById("list-items")
    items.innerHTML=''

    const value=x.value

    if (value !== null && value !== "") {

    const newdiv=document.createElement('div')
    newdiv.className= "mb-6";

    newdiv.innerHTML=`

    <div class="flex gap-6 items-center mb-1">


            

            <li class="font-bold text-xl w-[40%] bg-red-400 py-4 rounded-[8px]"></li>
            <button class="btn " onclick="subadd(this)">Subtopic</button>
            <button class="btn " onclick="strike(this)">Done</button>

            <p id="date" class="font-bold text-lg"> </p>
            <p class="done font-bold text-lg"> </p></div>


    
    
    `

    const add=newdiv.querySelector('li')
    
        add.textContent = value; // Only set the text content if value is valid


        const now = new Date();
        let hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

        

    // Select the <p> element inside newDiv (or use the existing one with id="date")
    const timeElement = newdiv.querySelector('#date'); // Assuming this is the <p> you want to update

    console.log("time = ",timeElement)

    // Add the time to the <p> element's text content
    timeElement.textContent = `Task Added: ${timeString}`;
    
list.append(newdiv)
x.value = "";
    }



})
function strike(button){


    const parent=button.parentElement

   const lis=parent.querySelector('li')

   if (lis){

   lis.style.textDecoration = "line-through";
   }

   const now = new Date();
        let hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

   const done = parent.querySelector('.done');
    done.textContent = `Task Done: ${timeString}`;


   





}

function subadd(button) {
    const subtopics = button.parentElement.parentElement; // Get the parent element of the subtopic button

    // Create a temporary input box and an Add button
    const tempInputDiv = document.createElement("div");
    tempInputDiv.className = "flex gap-2 items-center mt-2";

    const tempInput = document.createElement("input");
    tempInput.type = "text";
    tempInput.placeholder = "Enter subtopic";
    tempInput.className = "input input-bordered w-[50%] mt-2";

    const addButton = document.createElement("button");
    addButton.className = "btn w-[15%]";
    addButton.textContent = "Submit";
    

    // Append input and button to the temporary input div
    tempInputDiv.append(tempInput, addButton);

    // Append the temporary input box to the subtopics div
    subtopics.append(tempInputDiv);

    // Add event listener to the Add button
    addButton.addEventListener("click", () => {
        const subtopicValue = tempInput.value.trim(); // Get the value of the input

        if (subtopicValue !== "") {
            const newdiv = document.createElement("ul");
            newdiv.className = "list-disc ml-12 flex gap-12 items-center font-bold text-lg mb-4 mt-2";

            newdiv.innerHTML = `
                <li class="w-[45%] bg-slate-200 p-4 rounded-[16px]">${subtopicValue}</li>
                <button class="btn" onclick="strike(this)">Done</button>
                <p class="done font-bold text-lg"></p>
            `;

            // Append the new subtopic div to the list
            subtopics.append(newdiv);

            // Clear and hide the temporary input box
            tempInput.value = ""; // Clear the input box
            tempInputDiv.remove(); // Remove the input box from the DOM
        }
    });
}

