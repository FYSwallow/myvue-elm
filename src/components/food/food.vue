<template>
    <transition name="fade">
        <div class="food" v-show="showFlag">
            <div class="fond-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="iconfont icon-weibiaoti6-copy"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}></span>
                    </div>
                    <div class="cartControl-wrapper">
                        <cartControl :food="food"></cartControl>
                    </div>
                    <transition name="buy">
                        <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
                    </transition>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import cartControl from '@/components/cartControl/cartControl'
import split from '@/components/split/split'
export default {
    data() {
        return {
            showFlag: false,
        }    
    },
    props: ['food'],
    components: {
        cartControl,
        split
    },
    created() {
        console.log(this.food)
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(){
            this.$set(this.food, 'count', 1)
        }
    }
}
</script>

<style lang="scss">
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    overflow: auto;
    &.fade-enter-active, &.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
    }
    &.fade-enter, &.fade-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            .iconfont {
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
    .content {
        position: relative;
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 18px;
            line-height: 10px;
            font-size: 0;
            height: 10px;
            .sell-count, .rating{
                font-size: 10px;
                display: inline-block;
                color: rgb(147, 153, 159);
            }
            .sell-count{
                margin-right: 12px;
            }
        }
        .price {
            font-weight: 700;
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
        .cartControl-wrapper {
            position: absolute;
            right: 10px;
            bottom: 12px;
            width: 90px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 30px;
            z-index: 10;
            height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 10px;
            color: #fff;
            background: rgb(0, 160,220);
            &.buy-enter-active, &.buy-leave-active {
                transition: all 0.2s;
                opacity: 0;
            }
            &.buy-enter, &.buy-leave-active {
                opacity: 0;

            }
        }
        
    }
    .info {
        padding: 18px;
        .title {
            line-height: 14px;
            margin-bottom: 6px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .text {
            font-size: 12px;
            line-height: 24px;
            padding: 0 8px;
            color: rgb(77, 85, 93)
        }
    }
} 
</style>