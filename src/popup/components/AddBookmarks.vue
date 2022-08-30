<script>
    import CheckBox from "./CheckBox.vue";

    export default {
        data () {
            return {
                ckItems: [
                        ],
            }
        },
        components: {
            CheckBox,
        },
        props: {
            show: Boolean,
            tags: {
                type: Array,
                default: () => [
                    // { tag: "虎扑", checked: false },
                    // { tag: "bilibili", checked: false },
                    // { tag: "github", checked: false },
                    // { tag: "weibo", checked:  false },
                    // { tag: "tieba", checked: false }
                ],
            },
        }
    }
</script>
    
<template>
    <Transition name="modal">
    <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header">
            <slot name="header">default header</slot>
            </div>
            <CheckBox 
                :tags="tags"
            ></CheckBox>

 
            <div class="modal-footer">
            <slot name="footer">
                Tag选择完成后，请点击OK。
                <button
                class="modal-default-button"
                @click="$emit('close')"
                >OK</button>
            </slot>
            </div>
        </div>
        </div>
    </div>
    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
    * 对于 transition="modal" 的元素来说
    * 当通过 Vue.js 切换它们的可见性时
    * 以下样式会被自动应用。
    *
    * 你可以简单地通过编辑这些样式
    * 来体验该模态框的过渡效果。
    */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>