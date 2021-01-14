var submitBtn = document.getElementById('submit');
var platformInput = document.getElementById('platform');
var regionInput = document.getElementById('region');
var epicInput = document.getElementById('epic');
var result = document.querySelector('.result');

const fetchPlayers = async (platform, region, epic) => {
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/powerrankings/${platform}/${region}/${epic}`, {
        headers: {
            'TRN-Api-Key': 'ece061e2-6879-41c9-81ee-a7331500de07'
        }
    });

    const data = await api_call.json();
    return { data }
};


const showData = () => {
    fetchPlayers(platformInput.value, regionInput.value, epicInput.value).then((res) => {
console.log(res);





     const markup = `


            <div class="stats text-center">
<h1> ${res.data.name}</h1>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>Top ${res.data.percentile}% of Players</h5>
                            <h6>Percentile</h6>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>$${res.data.cashPrize}</h5>
                            <h6>Earnings</h6>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.rank} in ${res.data.region}</h5>
                            <h6>Rank</h6>
                        </div>
                    </div>
                    <h2>Shoot for the stars! Remember these stats when you visit next! Keep grinding:)</h2>

                </div>
            </div>
        `;
        result.insertAdjacentHTML('beforeend', markup);
    })
        .catch(err => console.log(err));
};

const clearField = () => {
  platformInput.value = 'Choose Platform';
  regionInput.value = 'Select Region';
    epicInput.value = '';

};

const clearPlayer = () => {
    result.innerHTML = '';
}

submitBtn.addEventListener('click', function () {
    showData();
    clearField();
    clearPlayer();
});
