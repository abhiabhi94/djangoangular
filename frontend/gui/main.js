Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">
                {{ detail }}
            </li>
        </ul>
    `
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
                <img :src="image" alt="socks" class="product-image">
                <div class="product-info">
                    <a :href="url">
                        <h1 class="productTitle">{{ title }}</h1>
                    </a>
                    <h4 class="product-description">{{ description }}</h4>
                    <p v-if="stock > 10" class="product-stock">On sale</p>
                    <p v-else-if="stock <= 10 && stock > 0 " class="product-stock">Almost sold!</p>
                    <p v-else="stock" class="product-stock" :style="styleObject">Out of stock</p>
                    <div class="product-details">
                        <p>Details</p>
                        <product-details :details="details"></product-details>
                    </div>
                    <div class="product-sizes">
                        <p>Available Sizes</p>
                        <ul>
                            <li v-for="size in sizes" :key="size.id">
                                {{ size.val }}
                            </li>
                        </ul>
                    </div>
                    <div class="product-variant" v-for="(variant, index) in variants" :key="variant.id">
                        <div class="color-box" :style="{ backgroundColor: variant.color }" @mouseover="updateImage(index)">
                        </div>
                    </div>
                    <p class="product-shipping">Shipping: {{ shipping }}</p>
                    <div class="cart-options">
                        <button class="increment-cart" :class="{ disabledButton: !stock }" :disabled="!stock" @click="incrementCart" :style="styleObject">Add to Cart</button>
                        <button class="decrement-cart" :class="{ disabledButton: !stock }" :disabled="!stock" @click="decrementCart" :style="styleObject">Remove from Cart</button>
                    </div>
                </div>
            </div>
    `,
    data() {
        return {
            brand: 'Action',
            product: 'Socks',
            description: 'Very good quality socks',
            selectedVariant: 0,
            url: 'https://www.hackadda.com',
            details: [
                '80% cotton', 'Gender-neutral', 'All season'
            ],
            variants: [{
                    id: 2234,
                    color: 'green',
                    image: 'assets/socks-green-onWhite.jpg',
                    quantity: 10
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: 'assets/socks-blue-onWhite.jpg',
                    quantity: 0
                }

            ],
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
        }
    },
    methods: {
        incrementCart: function() {
            this.variants[this.selectedVariant].quantity -= 1;
            this.$emit('update-cart', this.variants[this.selectedVariant].id, flag = 'add');
        },
        decrementCart: function() {
            this.variants[this.selectedVariant].quantity += 1;
            this.$emit('update-cart', this.variants[this.selectedVariant].id, flag = 'remove');
        },
        updateImage: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image;
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            } else {
                return 'Rs. 50';
            }
        },
        stock() {
            return this.variants[this.selectedVariant].quantity;
        },
        styleObject: function() {
            if (!this.stock) {
                return {
                    'text-decoration': 'line-through'
                }
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart: function(id, flag) {
            if (flag === 'add') {
                this.cart.push(id);
            } else {
                const index = this.cart.indexOf(id);
                if (index > -1) {
                    this.cart.splice(index, 1);
                } else {
                    window.alert('Item not present in the cart');
                }
            }
        }
    }
})