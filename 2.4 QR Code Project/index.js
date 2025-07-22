/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

async function main() {

    try {
        const { urlLink } = await inquirer.prompt([
            {
                type: "input",
                name: "urlLink",
                message: "What Url would you like to make into a QR code?"
            }
        ]);

        const { qrCodeName } = await inquirer.prompt([
            {
                type: "input",
                name: "qrCodeName",
                message: "QR Code file name?"
            }
        ]);

        const { confirmed } = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirmed",
                message: `Does this link look Correct? URL: ${urlLink} , QRCode name: ${qrCodeName}`,
                default: true
            }
        ]);


        if (confirmed) {

            fs.mkdir(`./${qrCodeName}`, (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`Folder created successful: ${qrCodeName}`);
                
                const qr_png = qr.image(`./${qrCodeName}/${urlLink}`, { type: 'png' });
                qr_png.pipe(fs.createWriteStream(`./${qrCodeName}/${qrCodeName}.png`));
    
                fs.writeFile('urlLink.txt', `./${qrCodeName}/${urlLink}`, err => {
                    if (err) {
                        console.log(`Error writing file ${err}`);
                        return
                    }
                    console.log(`Saved: ./${qrCodeName}/${urlLink}`);
                    
                });
            });
            
        } else {
            console.log("Lets try that again..");
            await main();
        }
        
    } catch (error) {
        if (error.TtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log(`Something went wrong: "${error}"`);
        }
    }
    
}

main();

