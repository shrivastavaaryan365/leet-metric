document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById('search-btn');
    const userNameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.Medium-progress');
    const hardProgressCircle = document.querySelector('.Hard-progress');
    const easyLabel = document.getElementById('easy-label');
    const mediumLable = document.getElementById('Medium-label');
    const hardLable = document.getElementById('Medium-label');
    const cardStatsContainer = document.querySelector('.stats-card');


    //Return true or false on the bases on a regular expression:
    function validateUsername(username){
        if(username.trim() ===""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        let isMatching= regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUserDetails(username) {
        
        const url = `https://leetcode-start-api.herokuapp.com/${username}`
        try{
            searchButton.textContent = "Searching..."
            searchButton.disabled=true;

            let response = await fetch (url);
            if(!response.ok){ 
                throw new Error("Unable to fetch the User details")
            }
            let data = await response.json();
            console.log("Looging data: ", data);
        }
        catch(error){
            statsContainer.innerHTML = `<p>No data found</p>`
        }
        finally{
            searchButton.innerHTML = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click', function(){
        const username = userNameInput.value;
        console.log(" Logging Username:", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})