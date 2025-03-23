import { Command} from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

//TODO: Api key storing simulation -> will re-adjust the path later.
const saveApiKey = (apiKey: string) => {
    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, `RANKDEVS_API_KEY=${apiKey}\n`, { flag: 'a' });
    console.log(`API key successfully saved to ${envPath}`);   
}

program
    .name('rankdevs-cli')
    .description('A CLI tool to set up RankDevs VS Code extension.')
    .version('1.0.0')
    .option('--apiKey <apiKey>', 'Set your API key')
    .action((options) => {
        if (options.apiKey) {
            saveApiKey(options.apiKey);
        } else {
            console.log("Please provide your API key using --apiKey flag");
        }
    });

program.parse(process.argv);