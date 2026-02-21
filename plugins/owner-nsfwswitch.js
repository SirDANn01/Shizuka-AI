export default {
  command: ['nsfwswitch', 'nsfwonly'],
  category: 'owner',
  isOwner: true, // Tu handler (el código del principio) detectará esto y bloqueará a los que no sean owner
  
  run: async (client, m, args, command) => {
    const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
    
    // Nos aseguramos de que el objeto de configuración del bot exista en la base de datos
    global.db.data.settings[botJid] = global.db.data.settings[botJid] || {}
    const settings = global.db.data.settings[botJid]
    
    const text = args.join(' ').toLowerCase()

    if (!text) {
      return m.reply(`*¿Cómo quieres configurar los comandos NSFW?*\n\nEscribe:\n/${command} libre\n/${command} soloowner`)
    }

    if (text === 'soloowner') {
      settings.nsfwOnlyOwner = true
      m.reply('✅ Los comandos NSFW ahora solo pueden ser usados por *Owners* a nivel global.')
    } else if (text === 'libre') {
      settings.nsfwOnlyOwner = false
      m.reply('✅ Los comandos NSFW ahora son de *Uso Libre* (cualquiera puede usarlos si el grupo tiene el NSFW activo).')
    } else {
      m.reply('❌ Opción no válida. Usa "libre" o "soloowner".')
    }
  }
}
