appData({
    counter: 0
});

function count() {
    counter = parseInt(counter) + 1
    state.save(counter)
}