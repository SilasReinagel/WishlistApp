<script>
    import { onMount } from 'svelte';
    import Home from './pages/Home.svelte';
    import NotFound from './pages/NotFound.svelte';

    let CurrentComponent;

    const routes = {
        '/': Home,
    };

    const routeTo = (path) => {
        window.history.pushState({}, '', path);
        handleNavigation();
    }

    const handleNavigation = () => {
        const path = window.location.pathname;
        CurrentComponent = routes[path] || NotFound;
    }

    onMount(() => {
        handleNavigation();
        window.addEventListener('popstate', handleNavigation);
    });
</script>

<svelte:component this={CurrentComponent} />
