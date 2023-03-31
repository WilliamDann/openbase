class View {
    constructor() 
    {
        this.adjacent = [];
        this.below    = [];
    }

    link(dom_query) {
        this.elem = document.querySelector(dom_query);
        if (!this.elem)
            throw Error(`Query ${dom_query} did not return any elements`);
        return this;
    }

    addColumn() {
        let sub = document.createElement('div');
        sub.className = 'column';
        sub.id = `${this.elem.id}_adj_${this.adjacent.length}`;
        this.elem.appendChild(sub);
        this.adjacent.push(new View().link(`#${sub.id}`));
    }

    addRow() {
        let sub = document.createElement('div');
        sub.id = `${this.elem.id}_below_${this.below.length}`;
        this.elem.parentElement.appendChild(sub);
        this.below.push(new View().link(`#${sub.id}`).init())
    }

    init() {
        this.addColumn();
        this.elem.className += 'row';
        this.elem.style.height = '100%';
        return this;
    }

    splitAdj() {
        this.addColumn();

        for (let child of this.adjacent)
            child.elem.style.width = `${100/(this.adjacent.length)-0.3}%`;

        return this.adjacent[this.adjacent.length-1];
    }

    splitBelow() {
        this.addRow();

        this.elem.style.height = `${100/(this.below.length+1)}%`;
        for (let child of this.below)
            child.elem.style.height = `${100/(this.below.length+1)}%`;

        return this.below[this.below.length-1];
    }
}