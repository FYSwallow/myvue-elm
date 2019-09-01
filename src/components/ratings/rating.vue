<template>
    <div class="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <v-star :score="seller.serviceScore" id="star"></v-star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <v-star :score="seller.foodScore" id="star"></v-star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
        </div>
        <v-split></v-split>
        <ratingselect :ratings="ratings" @typeRatings="typeRatings"></ratingselect>
        <div class="rating-wrapper">
            <ul>
                <li v-for="(rating,i) in category" :key="i" class="rating-item" >
                    <div class="avatar">
                        <img :src="rating.avatar" alt="" width="28" height="28">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="star-wrapper">
                            <v-star :score="rating.score" id="smallstar"></v-star>
                            <span class="delivery" v-show="rating.deliveryTime">
                                {{rating.deliveryTime}}
                            </span>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                                <i class="iconfont icon-damuzhi"></i>
                                <span  class="item" v-for="(item,i) in rating.recommend" :key="i">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import star from '@/components/star/star';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect'
import data from '@/assets/json/data.json';
import {dateFormat} from '@/assets/js/date';

export default {
    data(){
        return {
            ratings: [],
            selectedType: 2,
            filterRatings: []
        }
    },
    methods:{
        typeRatings(data) {
            this.selectedType = data
            console.log(this.selectedType)
        }
    },
    props: ['seller'],
    components: {
        'v-star': star,
        'v-split': split,
        ratingselect
    },
    created() {
        this.ratings = data.ratings
        console.log(this.ratings)
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return dateFormat(date, 'yyyy-MM-dd hh:mm');
        }
    },
    computed: {
        category() {
            if(this.selectedType === 2){
                return this.ratings
            }else if(this.selectedType === 0) {
                return this.ratings.filter((item, i) =>{
                    return item.rateType === 0;
                })
                console.log(this.ratings)
            }else if(this.selectedType === 1) {
                return this.ratings.filter((item, i) =>{
                    return item.rateType === 1;
                })
            }
        }
    }
}
</script>

<style lang="scss">
.ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    .overview {
        display: flex;
        padding: 18px 0px 18px 18px;
        .overview-left {
            flex: 0 0 137px;
            width: 137px;
            padding: 6px 0;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            .score {
                margin-bottom: 12px;
                line-height: 28px;
                font-size: 24px;
                color: rgb(255, 153, 0)
            }
            .title {
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
            }
            .rank {
                line-height: 10px;
                font-size: 12px;
                color: rgb(147, 153, 159);
            }
        }
        .overview-right {
            flex: 1;
            padding: 6px 0 6px 24px;
            .score-wrapper {
                line-height: 18px;
                margin-top: 8px;
                font-size: 0;
                .title {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                #star {
                    display: inline-block;
                    .star-wrapper {
                        margin: 0;
                        margin-left: 10px;
                        span {
                            width: 14px;
                            height: 14px;
                            background-size: cover;
                            margin-right: 5px;
                        }
                    }
                    
                }
                .score {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(266, 153, 0);
                
                }
            }
            .delivery-wrapper{
                font-size: 0;
                .title {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .delivery {
                    display: inline-block;
                    margin-left: 12px;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
    .rating-wrapper {
        padding: 0 18px;
        .rating-item {
            display: flex;
            padding: 18px 0;
            border-bottom: 1px solid rgba(1, 17, 27, 0.1);
            .avatar {
                flex: 0 0 28px;
                width: 28px;
                margin-right: 12px;
                img {
                    border-radius: 50%;
                }
            }
            .content {
                position: relative;
                flex: 1;
                .name {
                    margin-bottom: 4px;
                    line-height: 12px;
                    font-weight: 700;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                }
                .star-wrapper {
                    margin-bottom: 6px;
                    font-size: 0;
                    #smallstar {
                        display: inline-block;
                        .star-wrapper {
                            margin: 0;
                            margin-left: 10px;
                            span {
                                width: 10px;
                                height: 10px;
                                background-size: cover;
                                margin-right: 5px;
                            }
                        }
                        
                    }
                    .delivery {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 10px;
                        line-height: 12px;
                        color: rgb(147, 153 ,159);
                    }
                }
                .text {
                    line-height: 18px;
                    color: rgb(7, 17, 27);
                    font-size: 12px;
                    margin-bottom: 8px;
                }
                 .recommend{
                    line-height: 16px;
                    font-size: 0;
                    .iconfont, .item{
                        display: inline-block;
                        margin: 0 8px 4px 0;
                        font-size: 9px;
                    }
                    .iconfont{
                        color: rgb(0, 160, 220);
                    }
                    .item {
                        padding: 0 6px;
                        border: 1px solid rgba(7, 17, 27, 0.1);
                        border-radius: 1px;
                        color: rgb(147, 153, 159);
                        background: #fff;
                    }
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                 }
            }
        }
    }
} 
</style>