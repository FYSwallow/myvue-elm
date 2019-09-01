<template>
    <div>
        <div class="star-wrapper">
            <span v-for="(item, i) in itemClass" :class="item" :key="i"></span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            itemClass: []
        }
    },
    created() {
        this.starNumber()
        console.log(this.score)
    },
    props: ['score'],
    methods: {
         starNumber() {
            let starOn = Math.floor(this.score) 
            for(let i = 0; i < starOn ; i++) {
                this.itemClass.push('on')
            }
            if(this.score % 1 !==0) {
                this.itemClass.push('half')
            }
            while(this.itemClass.length < 5) {
                this.itemClass.push('off')
            }
            console.log(this.itemClass)
        }
    }
}

</script>

<style lang="scss" scoped>
.star-wrapper{
        position: relative;
        margin-top: 18px;
        padding: 2px 0;
        text-align: center;
        span {
            width: 20px;
            height: 20px;
            display: inline-block;
            margin-right: 10px;
            font-size: 30px;
            &.on {
                background-image: url('./star24_on@2x.png');
            }
            &.half {
                background-image: url('./star24_half@2x.png');
            }
            &.off {
                background-image: url('./star24_off@2x.png');
            }
        }
    }   
</style>