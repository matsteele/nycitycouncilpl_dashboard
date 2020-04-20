// loop through file and rename based on how similar the last name is to the image to councilseat, save a list of names not matched 
// create json that maps seats to image locations and save 
const fs = require('fs')

const cityCouncilData = require('./data/city-council-data.json')

// console.log('cityCouncilData', cityCouncilData)


const match_and_change = () => {
    for (const each of cityCouncilData) {
        // console.log(each);
        let last_name = each['last_name'].toLowerCase()
        console.log(last_name);

        fs.readdir('./headshots', (err, files) => {

            files.forEach(file => {
                // console.log(file, last_name);
                if (file.includes(last_name)) {
                    console.log(`./headshots/${file}`);
                    fs.rename(`./headshots/${file}`, `./headshots/${each['district']}.jpg`, function(err) {
                        if (err) console.log('ERROR: ' + err);
                    });
                }
            });
        });

    }
}

match_and_change()