<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <a class="menu-item"  tag="li" v-for="(item, index) in goods" :key="index" :class="{'current': resultNum === index} " href="javascript:void(0); " 
                @click="tabClass(index)">
                    <span class="text">
                        <span v-show="item.type>0" class=" icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </a>
            </ul>
        </div>
        <div class="foods-wrapper"  id="foodWrapper">
            <ul >
                <li class="food-list food-list-hook" v-for="(item, i) in goods" :key="i">
                    <h1 class="title" :id="'list'+i">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="(food, index) in item.foods" :key="index" @click="selectFood(food)">
                            <div class="icon">
                                <img :src="food.icon" alt="" width="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span class="count">好评{{food.rating}}</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartControl"  @click.stop="target">
                                    <cartControl :food="food" @result="resultFoods"></cartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div>
            <shopcart :selectFood="resultfoods" :deliveryPrice="seller.deliveryPrice"
                        :minPrice="seller.minPrice" :pos="position"></shopcart>
            <food :food="selectedFood" ref="food"></food>
        </div>
    </div>
</template>

<script>
import data from '@/assets/json/data.json';
import cartControl from '@/components/cartControl/cartControl'
import shopcart from '@/components/shopcart/shopcart'
import food from '@/components/food/food'
export default {
    data() {
        return {
            goods: [],
            listHeight: [],
            scrolly: 0,
            selectedFood: {},
            current: 0,
            resultfoods: [],
            position: {ballFlag: false},

        }
    },
    props: ['seller'],
    created() {
        this.goods = data.goods;
        console.log(this.goods)
        console.log(this.seller)
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    },
    mounted() {        
        this.$el.querySelector('#foodWrapper').addEventListener('scroll', this.handleScroll)
    },
    methods: {
        tabClass(index) {
            this.current = index
            this.$el.querySelector('#list'+index).scrollIntoView()
        },
        resultFoods(foods) {
            let flag = true
            if(this.resultfoods.length){
                this.resultfoods.forEach((item,i) => {
                    
                    //如果食物名字相同,则只改变数量
                    if(item.name === foods.name) {
                        this.resultfoods.splice(i,1)
                        this.resultfoods.push(foods)
                        flag = false
                        return
                    }
                })
                if(flag){
                    this.resultfoods.push(foods)
                }
            }else {
                this.resultfoods.push(foods)
            }
            
            console.log(this.resultfoods)
        },
        target(el){
            console.log(el)
            this.position.ballFlag = !this.ballFlag;
            this.$set(this.position, 'posX', el.pageX)
            this.$set(this.position, 'posY', el.pageY)
            console.log(this.position)
        },
        selectFood(food) {
            this.selectedFood = food;
            this.$refs.food.show();
        },
        handleScroll(){
            var height1
            var height2
            var scrollTop
            for(var i = 0; i < this.goods.length; i++){
                if(i< this.goods.length-1){
                    height1 = this.$el.querySelector('#list'+i).offsetTop
                    height2 = this.$el.querySelector('#list'+(i+1)).offsetTop
                    scrollTop = this.$el.querySelector('#foodWrapper').scrollTop 
                    console.log(height1 +'---'+scrollTop+'--'+height2)
                    if(height1 <= scrollTop && height2 >= scrollTop){
                        this.current = i 
                    }
                }else if(i = this.goods.length -1){
                    if(height1 <= scrollTop) {
                        this.current = i 
                    }
                }else if(i = 0){
                    if(scrollTop < height2) {
                        this.current = i 
                    }
                }
            }
        }
    },
    computed: {
        resultNum() {
            return this.current
        },
        selectedFoods(){
            let foods = []
            this.goods.forEach(good => {
                good.foods.forEach(food => {
                    if(food.count){
                        foods.push(food)
                    }
                }) 
            })
        }
    },
    components: {
        cartControl,
        shopcart,
        food
    }
}
</script>

<style lang="scss" scoped>
.goods {
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 46px;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        overflow: auto;
        .menu-item {
            width: 56px;
            height: 54px;
            line-height: 14px;
            padding: 0 12px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            display: flex;
            align-items: center;
            &.current {
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background: #fff;
                font-weight: 700;
                .text {
                    border: none;
                }
            }
            .icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                vertical-align: top;
                margin-right: 4px;
                background-size: 12px 12px;
                background-repeat: no-repeat;
                &.decrease {
                    background-image: url('decrease_3@2x.png');
                }
                &.discount {
                    background-image: url('discount_3@2x.png');
                }
                &.guarantee {
                    background-image: url('guarantee_3@2x.png');
                }
                &.invoice {
                    background-image: url('invoice_3@2x.png');
                }
                &.special {
                    background-image: url('special_3@2x.png');
                }
            }
            .text {
                width: 56px;
                font-size: 12px;
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        overflow: auto;

        .food-list {
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px; 
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                 background: #f3f5f7;
            }
            .food-item {
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                &:last-child {
                    border: none;
                    margin-bottom: 0px;
                }
                .icon {
                    margin-right: 10px;
                    img {
                        width: 57px;
                    }
                }
                .content {
                    flex: 1;
                    position: relative;
                    .name {
                        margin: 2px 0 8px 0;
                        font-size: 14px;
                        line-height: 14px;
                        height: 14px;
                        color: rgb(7, 17, 27)
                    }
                    .desc, .extra {
                        font-size: 10px;
                        line-height: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin-bottom: 8px;
                        line-height: 12px;
                    }
                    .extra{
                        .count {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-weight: 700px;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20)
                        }
                        .old {
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            text-decoration: line-through;
                        }
                    }
                    .cartControl{
                        position: absolute;
                        bottom: 12px;
                        right: 0;
                    }
                }
            }
        }
    }
}  
</style>