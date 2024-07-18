import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//Owner Numbers 
global.owner = [
  ['923135673658', 'wasi', false],
  [''], 
  [''],
]

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0xlV1lKcTNOb3BKNTlFdHJrd3pPQVk4RW02RmFXNUZBTFgyQ1VLQzcyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUl6bFRQT3ZZaFRHaDNyZnlrNHg0V3ZUYkJGUmF5enV6SE1uVDBVUHIzST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1laZkh6bmNsYkRIUkhvWnlYdUFWSDlaZ3dSUVh4QmxPYkVja0hFejFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvT2ZmREcwSTFweEZsZDJQSGdRam1wN1B0MmZma3oxS2NCNEc1anZ5UVFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllNTTdLMFdkdWtsSzBwNmE2dEZ2anphYzM2Q0FIczg4aGp0S0oyY2dzMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJjQkp1aVZzQm0zVzdycUlKRnZGOUxVL3ZULzAxK2h6Q3BEK1FWaXQ1aVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0d0dWtqT1FFY2tDUUdIMk9ReFd0RUMwa2Y4V1FSVWtXMFM4RlFYeDBsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnFaSzQvOEdFb2dmSnVvWFlSM3BwTE9STkxKVVg2WkQwR0o1ZGo5dCtVbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ4WmdyMXQ3UGdlV1FUd3NsOTRwazNqSlg3K0p3SGxtdkdlSkZiT2JKbWxZOWV5ZnVteW9OTHpSQTJmZDdDd2ZWbXl6SnRXUVNaNDVTWEFiNjNNTUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiIrK1U4L3JNdmdxOHZrM3VWb2w1Mjk3ck05ZGlXVWQycmNmSDB2eVY0VEJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHUWhmVmJIQlFMTzBEMU1XdEVxRlNRIiwicGhvbmVJZCI6IjNmM2M0NzBlLTc4OTYtNGVmNy1iMjkwLTE5NjdmNWJjZTM2OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyNEJqZjUrKzZXNzArOC9ZR0lNVSsyNEZ3ZDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjJmeitRbmpyR1R6R2tpS25BUFFldXNkaS9jPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjRGREo1R1dMIiwibWUiOnsiaWQiOiI5NDc0MjIxMzMzMTo1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKdTV0TDRHRUk2MTViUUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJuaCtDejNOTE5EL2JoWjA4VUxjbitheWtDeFZrRnFMYkpBNWdyQTB0V1cwPSIsImFjY291bnRTaWduYXR1cmUiOiJCUEJkdnU5NVl5aWFnclB5bjhWalhsaThtYlMxRlBNdTlBSFZpV1IvWkxQOUVvaGI1bkdLMC9PVUxUSXcyN3NPMlFCZkphT1Y1aFN4ekdZdEtueEhBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNHh0Umpxb212VW1uZGRHanU5TG9ZZy9HUWEzVnpBeWc0ZGRXMXlVd3ZwM1VoNnFlUCtXU2c5WDlLQzRvWmxrYVpmUit1VEJvQXpJeXNGZm5ndTc3Q0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc0MjIxMzMzMTo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlo0ZmdzOXpTelEvMjRXZFBGQzNKL21zcEFzVlpCYWkyeVFPWUt3TkxWbHQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzMjYyMzQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDZyIn0=" //put your bot number here
global.mods = ['923192173398'] 
global.prems = ['923192173398', '923192173398', '923192173398']
global.allowed = ['923192173398']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY'
}

// Sticker WM
global.botname = '𝗪𝗔𝗦𝗜-𝗠𝗗'
global.princebot = '🛡️𝗪𝗔𝗦𝗜 𝗧𝗘𝗖𝗛🛡️'
global.packname = '𝗪𝗔𝗦𝗜♥️' 
global.author = '𝗧𝗘𝗖𝗛♥️' 
global.princeig = 'https://www.instagram.com' 
global.princegp = 'https://whatsapp.com/channel/0029VaDK8ZUDjiOhwFS1cP2j'
global.menuvid = 'https://i.imgur.com/0UK6D3b.mp4'
global.Princesc = '' 
global.princeyt = 'https://youtube.com/@wasitech1'
global.Princelog = 'https://i.imgur.com/ujxeU8g.jpeg'
global.thumb = fs.readFileSync('./Assets/wasi.png')

global.wait = '*♻️ _ʟᴏᴅɪɴɢ ᴘʟᴢ ᴡᴀɪᴛ ᴅᴇᴀʀ _*\n*▰▰▰▱▱▱▱▱*'
global.imgs = '*🖼️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 ɪᴍᴀɢᴇs 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '♻️'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🌀' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
