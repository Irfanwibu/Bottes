exports.run = {
   usage: ['spin'],
   category: 'fun games',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (!args || !args[0] || args[0].startsWith('0')) return client.reply(m.chat, Func.texted('bold', `🚩 Berikan argumen berupa nominal point untuk dispin.`), m)
      if (isNaN(args[0])) return client.reply(m.chat, Func.example(isPrefix, command, '10000'), m)
      if (args[0] > user.point) return client.reply(m.chat, Func.texted('bold', `🚩 Pointmu tidak cukup untuk melakukan spin sebanyak ${Func.formatNumber(args[0])} point.`), m)
      if (args[0] < 1000) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa melakukan spin dengan nominal dibawah 1000 point.`), m)
      user.point -= args[0]
      let reward = Func.randomInt(100, args[0] * 3)
      user.point += reward
      let last = user.point
      let teks = `乂  *S P I N - R E S U L T*\n\n`
      teks += `	*- ${Func.formatNumber(args[0])}*\n`
      teks += `	*+ ${Func.formatNumber(reward)}*\n\n`
      teks += `• *Total* : ${Func.formatNumber(user.point)} Point\n\n`
      teks += `*NB : “Anti-Spam jeda ${global.cooldown} detik untuk eksekusi selanjutnya.”*`
      client.reply(m.chat, teks, m)
   },
   group: true,
   limit: true,
   game: true
}