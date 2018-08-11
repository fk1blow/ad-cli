#!/usr/bin/env node

import program from "commander";
import {
    GenerateComponentCommand,
    InitCommand,
    NewCommand,
} from "./commands";
import { Command } from "./commands/Command";
import { GenerateContainerCommand } from "./commands/GenerateContainer";
import { GenerateStoreCommand } from "./commands/GenerateStore";

const VERSION = "0.1.0";

const commands: Command[] = [
  new NewCommand(),
  new InitCommand(),
  new GenerateComponentCommand("atom"),
  new GenerateComponentCommand("molecule"),
  new GenerateComponentCommand("organism"),
  new GenerateComponentCommand("template"),
  new GenerateComponentCommand("page"),
  new GenerateStoreCommand(),
  new GenerateContainerCommand(),
];

program.version(VERSION);

commands.map((cmd) => {
    let command = program
        .command(cmd.name)
        .alias(cmd.alias);
    cmd.options.map((option) => {
        command = command.option(option.flag, option.description as any, option.defaultValue);
    });
    command.action(cmd.action);
});

program.parse(process.argv);
