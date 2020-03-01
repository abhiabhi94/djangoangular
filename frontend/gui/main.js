var app = new Vue({
    el: '#app',
    data: {
        brand: 'Action',
        product: 'Socks',
        description: 'Very good quality socks',
        image: 'https://picsum.photos/200',
        url: 'https://www.hackadda.com',
        inventory: 100,
        sizes: [{
                id: 1,
                val: "20 inch"
            },
            {
                id: 2,
                val: "24 inch"
            },
            {
                id: 3,
                val: "28 inch"
            }
        ],
        cart: 0,
        classObject: [{

        }],
        styleObject: {
            'text-decoration': 'line-through'
        }
    },
    methods: {
        increment: function() {
            this.cart += 1;
        },
        decrement: function() {
            this.cart -= 1;
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        }
    }
})