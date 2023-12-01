<script>
    import { onMount } from 'svelte';
    import NotFound from './pages/Structural/NotFound.svelte';
    import GroupCreation from './pages/Admin/GroupCreation.svelte';
    import UserAdmin from './pages/Admin/UserAdmin.svelte';
    import UserSelection from './pages/UserSelection.svelte';
    import ModeSelection from './pages/ModeSelection.svelte';
    import { routePath } from './appState';
    import MyWishlist from './pages/MyWishlist.svelte';
    import WishlistAdmin from './pages/Admin/WishlistAdmin.svelte';
    import RecipientSelection from './pages/RecipientSelection.svelte';
    import RecipientWishlist from './pages/RecipientWishlist.svelte';
    import GivingList from './pages/GivingList.svelte';

    const routeTo = (path) => {
        window.history.pushState({}, '', path);
        handleNavigation();
    }

    let CurrentComponent;

    const routes = {
        '/': UserSelection,
        '/init': GroupCreation,
        '/admin/users': UserAdmin,
        '/admin/wishlist': WishlistAdmin,
        '/mode': ModeSelection,
        '/wishlist': MyWishlist,
        '/give': RecipientSelection,
        '/gifts': RecipientWishlist,
        '/giving': GivingList,
    };

    const handleNavigation = () => {
        const path = window.location.pathname;
        routePath.set(path);
        console.log("Handling navigation", { path })
        CurrentComponent = routes[path] || NotFound;
    }

    onMount(() => {
      routePath.subscribe((path) => {
        routeTo(path)
      });
      handleNavigation()
      window.addEventListener('popstate', handleNavigation);
    });
</script>

<svelte:component this={CurrentComponent} />
