Promise.all([
    import("single-spa"),
    import("../project.config")
]).then(res => {
    const singleSpa = res[0];
    const config = res[1].default;

    const loadingPromises = [];
    const loadApp = async function (module) {
        try {
            const entry = await SystemJS.import(module.entry);
            singleSpa.registerApplication(
                module.name,
                () => new Promise(function (resolve) {
                    resolve(entry.default);
                }),
                () => {
                    return module.isBase ? true : window.location.hash.startsWith(`#/${module.name}`);
                }
            );
        } catch (e) {
            console.error(`【${module.name}】加载失败：${e}`);
            
        }
    };

    config.forEach(module => loadingPromises.push(
        loadApp(module)
    ));

    Promise.all(loadingPromises).then(() => {
        singleSpa.start();
    });
});
