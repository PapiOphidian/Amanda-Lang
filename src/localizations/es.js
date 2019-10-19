/**
 * Export properties are keyed by *CommandGroup* names.
 * Each *CommandGroup* consists of an *Object* filled with *LangCommand*s keyed by command names.
 * A *LangCommand* consists of *Object*s of `prompts` and `returns` and also an *Object* describing it's help meta data.
 *
 * Sub commands of Amanda cannot be modified because of the nature of the code. Example: `&music skip` where "skip"
 * cannot be modified. We might add this functionality at a later date. Most likely not.
 *
 * When describing the types of a command argument, those can be modified. Example: `"usage": "<code>"` where code
 * can be changed if applicable.
 *
 * Wild Cards are a concept used in this module. They are delimited by the percent symbol (%) and tell the code to
 * substitute the words connected to it with information which can only be retrieved by the code because it's dynamic
 *
 * Directly below this statement should be an *Object* titled generic. This contains generic phrases as to not repeat typing.
 * Some languages may not support the same fluidity English has so having this is optional. Just as long as the statement
 * ends up making sense to someone reading it from Discord.
 */
undefined;

const generic = {
	error: "API no regreso ningun dato.",
	dm: {
		success: "Te mande un mensaje privado.",
		fail: "nesesitas que darme permiso para mandarte un mensaje privado. A lo mejor me bloqueaste o nesesitas que activar mensajes directos a miembros del servidor. (ajustes de servidor → privacidad → permitir mensajes directos).",
		blocked: "No pude mandar un mensaje a este usuario. A lo mejor me bloquearon o nesesita que activar mensajes directos a miembros del servidor."
	},
	command: {
		dmOnly: "este comando solo funciona en mensajes privados.",
		guildOnly: "este comando no funciona en mensajes privados.",
		permPre: "No tengo permiso para",
		permPost: "Trabajo al 100 si tengo todos los permisos que pedi cuando me añadiste. Por favor modifica mis permisos.",
		input: {
			invalid: "esto no es disponible",
			insufficient: "Tu no tienes suficiente"
		}
	},
	emoji: {
		discoin: "<a:Discoin:422523472128901140>"
	}
};

module.exports = {
	admin: {
		evaluate: {
			help: {
				usage: "<codigo>",
				description: "Ejecuta arbitrary JavaScript en el processo"
			},
			prompts: {
				noInput: "No has escrito nada para ejecutar, menso."
			},
			returns: {}
		},
		execute: {
			help: {
				usage: "<codigo>",
				description: "Ejecuta un shell operation"
			},
			prompts: {
				noInput: "No has escrito nada para ejecutar, menso."
			},
			returns: {}
		},
		award: {
			help: {
				usage: "<cantidad> <usario>",
				description: "Premia a un usuario especifico"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				invalidAmount: `%username, ${generic.command.input.invalid} cantidad para premiar.`,
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`,
				dmFailed: generic.dm.blocked
			},
			returns: {
				channel: "%mention1 a regalado %number Discoins a %mention2",
				dm: `%mention te regalo %number ${generic.emoji.discoin}`
			}
		}
	},

	gambling: {
		slot: {
			help: {
				usage: "[cantidad: numero|all|half]",
				description: "Gira una maquina para la oportunidad de ganar discoins"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				permissionDenied: `${generic.command.permPre} attach files. ${generic.command.permPost}`,
				invalidBet: `%username, ${generic.command.input.invalid} bet.`,
				betSmall: `%username, nesesitar que apostar por lo menos 2 ${generic.emoji.discoin}`,
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`
			},
			returns: {
				lost: `Lo siento. You didn't get a match. Has perdido %number ${generic.emoji.discoin}`,
				triple: `Un triple. Ganaste %number ${generic.emoji.discoin}`,
				heart1: `Un :heart: Ganaste %number ${generic.emoji.discoin}`,
				heart2: `Wow! Doble :heart: Ganaste %number ${generic.emoji.discoin}`,
				heart3: `WOW! Triple :heart: Ganaste %number ${generic.emoji.discoin}`
			}
		},
		flip: {
			help: {
				usage: "Ninguno",
				description: "Voltear una moneda"
			},
			prompts: {},
			returns: {}
		},
		betflip: {
			help: {
				usage: "<cantidad: numero|all|half> [h|t]",
				description: "Apuesta con una moneda para la opportunidad de ganar Discoins"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				invalidBetandSide: "%username, nesesitas que proporcionar una apuesta y elegir un lado para apostar.",
				invalidBet: `%username, ${generic.command.input.invalid} bet.`,
				betSmall: `%username, you must bet at least 1 ${generic.emoji.discoin}`,
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`,
				invalidSide: "%username, ese no es un lado disponible para apostar."
			},
			returns: {
				autoChoose: "No eligiste ningun lado, so elegi uno para ti:",
				guess: "Tu elegiste %string1 Voltie %string2",
				win: `Bien hecho! Ganaste %number ${generic.emoji.discoin}`,
				lost: `Lo siento pero no elegieste correctamente. Para la proxima.`
			}
		},
		coins: {
			help: {
				usage: "[usario]",
				description: "Regresa la cantidad de discoins que tienes tu o el usuario"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`,
			},
			returns: {
				coins: `Discoins para %display`
			}
		},
		daily: {
			help: {
				usage: "Ninguno",
				description: "un comando que te regala discoins diariamente",
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				cooldown: "%username, tus monedas diarias se recuperan en %number.",
			},
			returns: {
				claimed: `%username reclamo sus monedas diarias y recibio %number ${generic.emoji.discoin}`
			}
		},
		leaderboard: {
			help: {
				usage: "[page]",
				description: "Enseña una tabla de clasificaciones de usuarios con mas monedas"
			},
			prompts: {},
			returns: {}
		},
		give: {
			help: {
				usage: "<cantidad: numero|all|half> <usuario>",
				description: "regala tus monedas a un usuario"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				invalidAmountandUser: "%username, nesesitas que escribir la cantidad y el usuario.",
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`,
				cannotGiveSelf: "No puedes dar monedas a ti menso.",
				invalidGift: `%username, ${generic.command.input.invalid} gift.`,
				giftSmall: `%username, nesesitas que regalar por lo menos 1 moneda ${generic.emoji.discoin}`,
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`,
				dmFailed: generic.dm.blocked
			},
			returns: {
				channel: "%mention1 regalo %number Discoins a %mention2",
				dm: `%mention te regalo %number ${generic.emoji.discoin}`
			}
		},
		wheel: {
			help: {
				usage: "[cantidad: numero|all|half]",
				description: "Gira una rueda para la oportunidad de ganar discoins"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				permissionDenied: `${generic.command.permPre} attach files. ${generic.command.permPost}`,
				invalidAmountWheel: "%username, nesesitas que escribir una cantidad para girar la rueda",
				betSmall: `%username, nesesitas que apostar por lo menos 1 moneda ${generic.emoji.discoin}`,
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`,
				invalidAmount: `%username, ${generic.command.input.invalid} amount.`,
			},
			returns: {
				winnings: `%tag aposto %number1 Discoins y recibio %number2 de regreso ${generic.emoji.discoin}`
			}
		}
	},

	games: {
		trivia: {
			help: {
				usage: "[category]",
				description: "Juega un juego de trivia con otros usuarios para ganar discoins"
			},
			prompts: {
				categorySelect: "para seleccionar una categoria usa `&trivia <category name>`.",
				dm: "%username, Te mande un mensaje privado con la lista de categorias.",
				noCategory: "%username, No encontre ninguna categoria con ese nombre. Usa `&trivia categories`para ver una lista de categorias.",
				multipleCategories: "%username, there are multiple categories with that name: %string",
				gameInProgress: "%username, ya esta un juego en seccion.",
				APIError: "Ha ocurrido un error en el api",
				parsingError: "Ha ocurrido un error analizando los datos regresado por el api",
				permissionDenied: `${generic.command.permPre} añadir reacciones`
			},
			returns: {}
		},
		minesweeper: {
			help: {
				usage: "[easy|medium|hard] [--raw] [--size:numero]",
				description: "Comienza un juego de minesweeper con el sistema de revelaciones de discord"
			},
			prompts: {},
			returns: {
				info: `%difficulty -- %number1 bombs, %number2x%number2 board`,
				error: "El tamaño minimo es 4 y el maximo es 14. Bounds have been adjusted to normals",
				rawTooLarge: "El contenido excede mas de 2000 palabras, por favor usa una tabla mas pequeña"
			}
		}
	},

	interaction: {
		ship: {
			help: {
				usage: "<usuario 1> <usuario 2>",
				description: "Ship a dos usuarios"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				permissionDenied: `${generic.command.permPre} attach files. ${generic.command.permPost}`,
				invalidUsers: `%username, nesesitas que escribir los usuarios`,
				invalidUser1: `%username:el primer miembro no es valido`,
				invalidUser2: `%username, the segundo miembro no es valido`,
				selfShip: "%username, no puedes hacer el ship a ti solo menso :v",
			},
			returns: {
				rating: "Que Bonito. Le doy %display1 y %display2 %percentage% de estar juntos."
			}
		},
		waifu: {
			help: {
				usage: "[usuario]",
				description: "Obtenga informacion waifu de usted mismo o de un usuario"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`
			},
			returns: {
				price: "Precio:",
				claimedBy: "Reclamado por:",
				gifts: "Regalos:"
			}
		},
		claim: {
			help: {
				usage: "<cantidad: numero|all|half> <usuario>",
				description: "Reclama a un usuario como tu waifu. Requiere Discoins"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				badFormat: "%username, se escribe `&claim <cantidad> <usuario>`. Amount comes first, usuario comes last.",
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`,
				selfClaim: "%username, no puedes reclamar a ti mismo menso :v",
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`,
				claimSmall: `%username, you must claim someone with at least 1 ${generic.emoji.discoin}`,
				claimedByOther: `%username, este usuario ya fue reclamado por alguien mas, y por un precio mas alto. nesesitas que gastar mas de %number Discoins para reclamar a este usuario.`,
				doubleClaim: "%username, ya reclamaste a ese usuario como tu waifu. Si quieres subir su precio, usa `&gift <cantidad>`",
				dmFailed: generic.dm.blocked
			},
			returns: {
				claimed: `%mention1 reclamo a %mention2 por %number ${generic.emoji.discoin}`,
				dm: `%mention te reclamo por %number ${generic.emoji.discoin}`
			}
		},
		divorce: {
			help: {
				usage: "[razon]",
				description: "Divorcia a tu waifu"
			},
			prompts: {
				noWaifu: "%username, no tiene a ningun waifu menso :v",
				dmFailed: generic.dm.blocked
			},
			returns: {
				divorced: "%tag1 divorcio a %tag2 con %reason",
				dm: "%tag te divorcio con %reason"
			}
		},
		gift: {
			help: {
				usage: "<cantidad: numbero|all|half>",
				description: "Regala una cantidad de Discoins a el precio de tu waifu"
			},
			prompts: {
				guildOnly: `%username, ${generic.command.guildOnly}`,
				noWaifu: "%username, tu no tienes ningun waifu para regalar discoins menso",
				noGift: "%username, no escribiste una cantidad para regalar",
				moneyInsufficient: `%username, ${generic.command.input.insufficient} Discoins.`,
				invalidGift: `%username, ${generic.command.input.invalid} regalo.`,
				giftSmall: `%username, nesesitas que regalar por lo menos 1 ${generic.emoji.discoin}`
			},
			returns: {
				gifted: "%tag2 regalo %number Discoins para el precio de %tag2"
			}
		},
		bean: {
			help: {
				usage: "<usuario>",
				description: "Banea a un usuario"
			},
			prompts: {
				guildOnly: "%username, no puedes darle ban a alguien en mensajes privados menso",
				invalidUser: `%username, ${generic.command.input.invalid} usuario.`,
				selfBean: "%username, no puedes darle ban a ti mismo menso"
			},
			returns: {
				beaned: "%tag fue baneado!"
			}
		}
	},

	meta: {
		invite: {
			help: {
				usage: "Ninguno",
				description: "Añada a Amanda a tu servidor"
			},
			prompts: {},
			returns: {
				invited: "Fui invitada?",
				notice: "Recuerda, nesesitas permisos de **Gestionar servidor** para añadir bots a tu servidor ."
			}
		},
		info: {
			help: {
				usage: "Ninguno",
				description: "Enseña informacion de Amanda"
			},
			prompts: {},
			returns: {
				thanks: "Gracias por ser mi amigo(a)! :heart:\nHere's a little bit of info about me...",
				creators: "Creador:",
				links: "Visita el sitio web de amanda [sitio web](%website) o su servidor de soporte [servidor de soporte](https://discord.gg/zhthQjH)\nQuieres donar? Visita mi pagina de patreon [Patreon](https://www.patreon.com/papiophidian) o puedes dar una donacion de 1 vez aqui [PayPal](https://paypal.me/papiophidian)."
			}
		},
		donate: {
			help: {
				usage: "Ninguno",
				description: "Obten informacion de como hacer una donacion"
			},
			prompts: {},
			returns: {
				intro: "Piensas en dar una donacion? ❤",
				description: "Estoy muy feliz que quieres dar una donacion a mis creadores!"
				+"\n\nSi te interesa hacer donaciones cada mes, visita [Patreon](https://www.patreon.com/papiophidian),"
				+" o si quieres dar una donacion de 1 vez, visita [PayPal](https://paypal.me/papiophidian)."
				+"\n\nTodas las donaciones van por mi desarrollo."
				+"\nAcesso a mis funciones no cambiaran por tu elecciones,"
				+" pero recibiras un rol de donacion en nuestro servidor de soporter [Servidor de soporte](https://discord.gg/zhthQjH)"
				+" y recibes una medalla de donador en &profile."
			}
		},
		
	}
};
