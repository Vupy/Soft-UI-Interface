<template>
    <div>
        <!-- <div v-for="i in colors" :key="'color__' + i" class="grid grid__columns__10  h__8">
            <p v-for="j in shades" :key="'color__' + i + '__' + j" :class="'text__' + i + '__' + j">
                .text__{{i}}__{{j}}
            </p>
        </div> -->
        <div v-for="i in colors" :key="'bg__' + i" class="grid grid__columns__10 h__8">
            <div v-for="j in shades" :key="'bg__' + i + '__' + j" :class="'flex flex__justify__center flex__align__center bg__' + i + '__' + j">
                .__{{i}}__{{j}}
            </div>
        </div>
        <!-- <div v-for="i in colors" :key="'border__' + i" class="grid grid__columns__10 h__8">
            <div v-for="j in shades" :key="'border__' + i + '__' + j" :class="'wmax-4 flex flex__justify__center flex__align__center border__' + i + '__' + j" style="border-width: 2px; border-style: solid;">
                .border__{{i}}__{{j}}
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            colors: [
                "main",
                "red",
                "rose",
                "pink",
                "hot__pink",
                // "lilac",
                "purple",
                "violet",
                "indigo",
                "blue",
                "sky__blue",
                "turquoise",
                "cyan",
                "teal",
                "green",
                "lime",
                "yellow",
                "ambar",
                "orange",
                "deep__orange",
                "brown",
                "gray",
                "flat__gray",
                "blue__gray",
                "slate",
                "black",
                "white",
            ],
            shades: [
                50,
                100,
                200,
                300,
                400,
                500,
                600,
                700,
                800,
                900,
            ]
        }
    },
}
</script>