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
                <img :src="image" alt="socks" class="productImage">
                <div class="productInfo">
                    <a :href="url">
                        <h1 class="productTitle">{{ title }}</h1>
                    </a>
                    <h4 class="productDescription">{{ description }}</h4>
                    <p v-if="stock > 10" class="productStock">On sale</p>
                    <p v-else-if="stock <= 10 && stock > 0 " class="productStock">Almost sold!</p>
                    <p v-else="stock" class="productStock" :style="styleObject">Out of stock</p>
                    <div class="productDetails">
                        <p>Details</p>
                        <product-details :details="details"></product-details>
                    </div>
                    <div class="productSizes">
                        <p>Available Sizes</p>
                        <ul>
                            <li v-for="size in sizes" :key="size.id">
                                {{ size.val }}
                            </li>
                        </ul>
                    </div>
                    <div class="productVariant" v-for="(variant, index) in variants" :key="variant.id">
                        <div class="colorBox" :style="{ backgroundColor: variant.color }" @mouseover="updateImage(index)">
                        </div>
                    </div>
                    <p class="productShipping">Shipping: {{ shipping }}</p>
                    <div class="productCart">
                        <button class="increment" :class="{ disabledButton: !stock }" :disabled="!stock" @click="increment" :style="styleObject">Add to Cart</button>
                        <p class="cart" :class="{ disabledButton: !stock }" :disabled="!stock" :style="styleObject"><b>Cart({{ cart }})</b></p>
                        <button class="decrement" :class="{ disabledButton: !stock }" :disabled="!stock" @click="decrement" v-show="cart > 0" :style="styleObject">Remove from Cart</button>
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
            cart: 0
        }
    },
    methods: {
        increment: function() {
            this.cart += 1;
        },
        decrement: function() {
            this.cart -= 1;
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
        stock() {
            return this.variants[this.selectedVariant].quantity;
        },
        styleObject: function() {
            if (!this.stock) {
                return {
                    'text-decoration': 'line-through'
                }
            }
        },
        shipping() {
            if (this.premium) {
                return 'Free';
            } else {
                return 'Rs. 50';
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
    }
})