const IngredientChart = () => {
    
    const [ingTree, setIngTree] = React.useState({})

    console.log(ingTree)
    
    const fetchIngTree = async () => {
        fetch('/ingredient-analysis.json')
        .then((response) => response.json())
        .then((data) => {
            const root = partition(data);
            setIngTree(root)
        })
    }

    React.useEffect(() => {
      fetchIngTree();
    }, []);

    return (
        <div>Test</div>
    )
}