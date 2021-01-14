var submitBtn = document.getElementById('submit');
var gamertagInput = document.getElementById('gamertag');
var platformInput = document.getElementById('platform');
var result = document.querySelector('.result');

const fetchPlayers = async (gamertag, platform) => {
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://api.fortnitetracker.com/v1/profile/${platform}/${gamertag}`, {
        headers: {
            'TRN-Api-Key': 'b78c0885-7713-4245-9a16-f8e28614fed1'
        }
    });

    const data = await api_call.json();
    return { data }
};


const showData = () => {
    fetchPlayers(gamertagInput.value, platformInput.value).then((res) => {
console.log(res);
     const markup = `

            <div class="stats text-center">
                <h1>${res.data.epicUserHandle} (${res.data.platformNameLong})</h1>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.lifeTimeStats[11].value}</h5>
                            <h6>KD</h6>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.stats.curr_p2.kd.value}</h5>
                            <h6>Current Season Solo KD</h6>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.lifeTimeStats[9].value}</h5>
                            <h6>Win%</h6>
                        </div>
                    </div>

                        <h2>Shoot for the stars! Practice like you've never won, play like you've never lost!</h2>

                </div>
            </div>

        `;
        result.insertAdjacentHTML('beforeend', markup);
    })
        .catch(err => console.log(err));
};

const clearField = () => {
    gamertagInput.value = '';
    platformInput.value = 'Choose Platform';
};

const clearPlayer = () => {
    result.innerHTML = '';
}

submitBtn.addEventListener('click', function () {
    showData();
    clearField();
    clearPlayer();
});
