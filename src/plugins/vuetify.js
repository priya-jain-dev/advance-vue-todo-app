import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
    icons: {
        iconfont: 'md',
    },
    theme: {
        // dark: true,
        themes: {
            light: {
                primary: '#5A5EE7',
                secondary: '#f57173',
                accent: '#8F8DA5',
                error: '#b71c1c',
            },
            // dark: {
            //     primary: "#5A5EE7",
            //     secondary: '#f57173',
            //     accent: '#D2D2D2',
            // },
        },
    }
}

export default new Vuetify(opts)