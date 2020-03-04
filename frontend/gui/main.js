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

Vue.component('product-review', {
    template: `
    <form class="product-review-form" @submit.prevent="onSubmit">
        <legend>Rate this product</legend>
        <div class="review-errors">
            <ul v-for="error in errors">
                <li class="error">{{ error }}</li>
            </ul>
        </div>
        <fieldset>
            <div class="review-name">
                <label for="name">Name:</label>
                <input type="text" name="name" value="name" v-model="name">
            </div>
            <div class="review-review">
                <label for="review">Review:</label>
                <textarea name="review" value="review" v-model="review"></textarea>
            </div>
            <div class="review-rating">
                <label for="rating"> Rating:</label>
                <select name="rating" id="rating" v-model.number="rating">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </div>
            <div class="recommendation-choice">
                <p>Would you recommend this product?</p>
                <label>Yes
                    <input type="radio" name="yes" id="recommendation-yes" value="yes"  v-model.boolean="recommendationChoice">
                </label>
                <label>No
                    <input type="radio" name="no" id="recommendation-no" value="no"  v-model.boolean="recommendationChoice">
                </label>
            </div>
            <p>
                <input type="submit"></button>
            </p>
        </fieldset>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendationChoice: null,
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendationChoice: this.recommendationChoice === 'yes' ? true : false
                };
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommendationChoice = true;
            } else {
                if (!this.name) this.errors.push('Name is required');
                if (!this.review) this.errors.push('Review is required');
                if (!this.rating) this.errors.push('Rating is required');
                if (!this.recommendationChoice) this.errors.push('Please select an appropriate choice');
            }
        }
    }
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
            <div class="product-image">
                <img :src="image" alt="{{ title }}">
            </div>
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
            <div class="product-reviews">
                <h3>Product Reviews</h3>
                <p v-if="!reviews.length">There are no reviews here</p>
                <div>
                    <div class="product-review" v-for="review in reviews">
                        <p><span class="text-muted">Name:</span> {{ review.name }}</p>
                        <p><span class="text-muted">Rating:</span> {{ review.rating }}</p>
                        <p class="review-message"><span class="text-muted">Review:</span> {{ review.review }}</p>
                        <p class="review-choice" v-if="review.recommendationChoice"><span class="text-muted">Recommendation Choice:</span>Yes</p>
                        <p class="review-choice" v-else><span class="text-muted">Recommendation Choice:</span>No</p>
                    </div>
                </div>
            </div>
                <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
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
        },
        addReview: function(review) {
            this.reviews.push(review);
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
        cart: [],
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