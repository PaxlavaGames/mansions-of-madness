const create_cube = (name, sides) => {
    return {
        name: name,
        sides: sides,
    }
}

const success_image = '<i style="color:violet;" class="bi bi-arrow-through-heart-fill h1"></i>'
const empty_image = '<i class="bi bi-ban h1"></i>'
const evidence_image = '<i style="color:green;" class="bi bi-search-heart h1"></i>'

const sides = [
    {
        name: "Empty",
        image: empty_image,
    },
    {
        name: "Empty",
        image: empty_image,
    },
    {
        name: "Empty",
        image: empty_image,
    },
    {
        name: "Success",
        image: success_image,
    },
    {
        name: "Success",
        image: success_image,
    },
    {
        name: "Success",
        image: success_image,
    },
    {
        name: "Evidence",
        image: evidence_image,
    },
    {
        name: "Evidence",
        image: evidence_image,
    },
]

const cube = create_cube(
    "Mansions of madness cube",
    sides
)

const drop_cube = (cube) => {
    const sides = cube.sides
    const random_side = sides[Math.floor(Math.random()*sides.length)];
    return random_side
}

const drop_many_similar_cubes = (cube, count) => {
    const result = Array.from({ length: count }, (_element, _index) => drop_cube(cube));
    return result
}

const countResults = (results) => {
    const counts = {}

    results.forEach(item => {
        const nameKey = item.name; 
        if (counts[nameKey]) {
            counts[nameKey]++;
        } else {
            counts[nameKey] = 1;
        }
    });

    return counts;
}

const displayResults = (results) => {
    const resultsDiv = document.getElementById("results");
    
    const ul = document.createElement("ul");
    ul.classList.add("list-group");
    
    results.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        if (item.image) {
            li.innerHTML = item.image; 
        } else {
            li.textContent = item.name;
        }

        ul.appendChild(li);
    });
    
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(ul);
}

displayStatistics = (statistics) => {
    const statisticDiv = document.getElementById("statistic");

    const ul = document.createElement("ul");
    ul.classList.add("list-group");

    for (const [name, count] of Object.entries(statistics)) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = `${name}: ${count}`;
        ul.appendChild(li);
    }

    statisticDiv.innerHTML = "";
    statisticDiv.appendChild(ul);
}


document.getElementById("drop").addEventListener("click", function(event) {
    const count_input = document.getElementById("cubes_count")
    const cubes_count = parseInt(count_input.value);
    const results = drop_many_similar_cubes(cube, cubes_count)
    displayResults(results)
    const statistic = countResults(results)
    displayStatistics(statistic)
});