<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" @click="select(2)" :class="{'active': selectType === 2}">
                全部
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" @click="select(0)" :class="{'active': selectType === 0}">
                满意
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" @click="select(1)" :class="{'active': selectType === 1}">
                吐槽
                <span class="count">{{nagatives.length}}</span>
            </span>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectType: 2,
        }
    },
    props: ['ratings'],
    created() {
        console.log(this.ratings)
    },
    computed: {
        positives(){
            return this.ratings.filter((rating) => {
                return rating.rateType === 0;
            });
        },
        nagatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === 1;
            });
        }
    },
    methods: {
        select(index) {
            this.selectType = index
            this.$emit('typeRatings',this.selectType)
        }
    }
}
</script>

<style lang="scss" scoped>
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            color: rgb(77, 85, 93);
            &.positive {
                background: rgba(0, 160, 220, 0.2);
                &.active{
                    color: #ffffff;
                    background: rgb(0, 160, 220);
                }
            }
            &.negative{
                background: rgba(77, 85, 93, 0.2);
                &.active{
                    color: #ffffff;
                    background: rgb(77, 85, 93);
                }
            }
        }
    }
}   
</style>