import {Command} from 'commander'
import * as command from './src/commands'

const program = new Command()

program
	.description('Interactive tool for @openapi-adapter development')

program
	.command('generate')
	.action(command.generate)

program.parse(process.argv)
