import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/sections/index.css'
import { boot } from './app'
import { detectLang } from './core/i18n'

boot(detectLang())
