const path = 'highest_earning_players.csv';
const csv = require('csvtojson');
var fs = require('fs');
const countryCodes = require('../HighestEarnings/countries.json');

// PlayerId,    NameFirst,  NameLast,   CurrentHandle,   CountryCode,       TotalUSDPrize,  Game,                               Genre
// 3883,        Peter,      Rasmussen,  dupreeh,         dk,                1822989.41,     Counter-Strike: Global Offensive,   First-Person Shooter

// { Country: 'dk', Earnings: 26840785 }

const output = [];
const cCodes = [];
const final = [];

const sorting = (a, b) => {
    if (a.Earnings === b.Earnings) { return 0 }
    else { return (a.Earnings < b.Earnings) ? -1 : 1 }
};

csv().fromFile(path)
    .then((data) => {

        data.forEach(d => {
            let cCode = d.CountryCode;
            if (!cCodes.includes(cCode)) { cCodes.push(cCode) };
        });

        cCodes.forEach(c => {

            let total = 0;

            data.forEach(e => {
                if (c === e.CountryCode) total += parseInt(e.TotalUSDPrize);
            })

            output.push({ Country: c, Earnings: total });
        });


        // console.log(output);
        output.forEach(e => {

            for (let i = 0; i < countryCodes.length; i++) {
                let code = countryCodes[i]['alpha-3'];
                let country = countryCodes[i].name;

                if (e.Country === toLower(code)) {
                    final.push({
                        name: country,
                        code: code,
                        earnings: e.Earnings,
                    })
                }
            }
        })

        fs.writeFile('dataset.json', JSON.stringify(final), function(err, result) {
            if (err) console.log("error : ", err)
        });
    

    });



    
