<template>
    <div class="card">
        <h3>{{ ticket.name }}</h3>

        <p class="meta" v-if="user && !user.isAdmin && (ticket.status == 'New' || ticket.status == 'In Progress')">{{ ticket.status }}</p>
        <p class="meta">{{ moment(ticket.createdAt).format("YY-MM-DD") }}</p>
        <p class="meta" v-if="user && user.isAdmin">{{ ticket.user.name }}</p>
        <p class="meta">{{ ticket.priority }} Priority</p>
        <p class="meta">{{ ticket.category }}</p>

        <p class="desc clamped-text">{{ ticket.description }}</p>

        <RouterLink :to="`/ticket/${ticket._id}`" class="btn-primary">Show Ticket</RouterLink>
    </div>
</template>

<script setup>
    import { useAuth } from '../composables/useAuth';
    const { user } = useAuth();

    import moment from "moment";
    defineProps({
    ticket: {
        type: Object,
        required: true,
    }
    });
</script>

<style scoped>

    .card {
        background: var(--bg2);
        width: 48.5%;
        display: inline-block;
        margin-bottom: 30px;
        border-radius: 20px;
        padding: 30px;
    }

    .btn-primary {
        display: inline-block;
        margin-top: 15px;
    }

    h3 {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        line-height: 22px;
    }

    .meta {
        display: inline-block;
        border: var(--text2) solid 1px;
        border-radius: 10px;
        padding: 8px 12px;
        margin: 0 10px 10px 0;
        font-size: 15px;
        line-height: 15px;
        color: var(--text2);
    }

    .desc {
        margin: 5px 0;
        min-height: 48px;
    }

    .clamped-text {
        display: -webkit-box;      /* For Chrome, Safari, and Edge */
        display: -moz-box;         /* For older Firefox versions */
        display: -ms-flexbox;      /* For older IE/Edge versions */
        display: box;              /* Fallback for older browsers */
        -webkit-line-clamp: 2;     /* Specify the number of lines */
        -moz-line-clamp: 2;        /* For older Firefox versions */
        line-clamp: 2;
        -webkit-box-orient: vertical;  /* Vertical orientation for multi-line clamping */
        -moz-box-orient: vertical;     /* Firefox vertical orientation */
        box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 700px) {
        .card {
            width: 100%;
        }
    }

</style>