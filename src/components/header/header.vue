<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="supports-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon iconfont icon-zuoyoujiantou"></i>
            </div>
        </div>
        <div class="news" @click="showDetail">
            <span class="news-title"></span>
            <span class="news-text">{{seller.bulletin}}</span>
            <i class="icon iconfont icon-zuoyoujiantou"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow" @click="hideDetail">
                <div class="detail-wrapper ">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <!-- <div class="star-wrapper">
                            <span v-for="(item, i) in itemClass" :class="item" :key="i"></span>
                        </div> -->
                        <v-star :score="seller.score"></v-star>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports">
                            <li class="supports-item" v-for="(item, i) in seller.supports" :key="i">
                                <span class="icon" :class="classMap[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="news">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                    
                    <div class="detail-close" @click="hideDetail">
                        <i class="iconfont icon-cha"></i>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    
</template>

<script>
import star from '@/components/star/star'
export default {
    data() {
        return {
            detailShow: false,
        }
    },
    props: ['seller'],
    created() {
        console.log(this.seller.score)
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        },
       

    },
    components: {
        'v-star': star
    }
}
</script>

<style lang="scss">
.header {
    position: relative;
    color: #fff;
    overflow: hidden;
    background: rgba(7, 17, 27, .5);
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
            
        }
        .content {
            display: inline-block;
            font-size: 12px;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    background-image: url("brand@2x.png");
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
               .icon {
                   display: inline-block;
                   width: 12px;
                   height: 12px;
                   vertical-align: top;
                   margin-right: 4px;
                   background-size: 12px 12px;
                   background-repeat: no-repeat;
                   &.decrease {
                      background-image: url("decrease_1@2x.png"); 
                   }
               } 
               .text {
                   line-height: 12px;
                   font-size: 12px;
               }
            }
        }
        .supports-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                font-size: 10px;
                vertical-align: top;
            }
            .icon {
                margin-left: 2px;
                line-height: 24px;
                font-size: 10px;
            }
        }
    }
    .news {
        position: relative;
        background-color: rgba(7, 17, 27, 0.2);
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        .news-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
            width: 22px;
            height: 12px;
            background-image: url('bulletin@2x.png');
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .news-text {
            width:90%;
            display: inline-block;
            vertical-align: top;
            margin: 0 4px;
            font-size: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .icon{
            font-size: 20px;
            position: absolute;
            right: 12px;
            top: 0;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px)
    }
    .detail {
        position: fixed;
        z-index: 100;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        -webkit-backdrop-filter: blur(10px);
        &.fade-enter-active{
            animation: bounce-in .5s;
        }
        &.fade-leave-active{
            animation: bounce-out .5s;
        }

        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
            }
        }
        @keyframes bounce-out {
            0% {
                transform: scale(1);
            }
            50%{
                transform: scale(1.5);
            }
            100%{
                transform: scale(0);
            }
        }
        .detail-wrapper {
            width: 100%;
            min-height: 100%;
            .detail-main {
               margin-top: 64px; 
               padding-bottom: 64px;
               .name {
                   line-height: 16px;
                   text-align: center;
                   font-size: 16px;
                   font-weight: 700;
               }
               .title {
                   width: 80%;
                   display: flex;
                   margin: 28px auto 0 auto;
                   .line {
                       flex: 1;
                       position: relative;
                       top: -6px;
                       border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                   }
                   .text {
                       padding: 0 12px;
                       font-size: 16px;
                       font-weight: 700px;
                   }
               }
               .supports {
                   width: 80%;
                   margin: 22px auto;
                    .supports-item {
                        padding: 0 12px;
                        font-size: 0px;
                        margin-bottom: 12px;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            &.decrease {
                                background-image: url('decrease_2@2x.png');
                            }
                            &.discount {
                                background-image: url('discount_2@2x.png');
                            }
                            &.guarantee {
                                background-image: url('guarantee_2@2x.png');
                            }
                            &.invoice {
                                background-image: url('invoice_2@2x.png');
                            }
                            &.special {
                                background-image: url('special_2@2x.png');
                            }
                        }
                        .text {
                            line-height: 12px;
                            font-size: 12px;
                            color: #fff;
                        }
                    }
                }
                .news {
                    width: 80%;
                    height: 200px;
                    margin: 22px auto;
                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
            .detail-close {
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto 0;
                clear: both;
                font-size: 32px;
            }
        }
    }
}
    
</style>