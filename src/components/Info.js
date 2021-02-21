import React from 'react'

export function Info(){

    return(
        <div className="container">
            <h5>What is A* algorithm?</h5>
            <p>
                A* is an algorithm that finds the shortest path to a goal 
                from a start state. In this demo our start state is the green 
                block, and the end state is to get to the blue block. 
            </p>
            <p>
                This algorithm takes into account the cost to get to a state and 
                a heuristic. In this demo the cost to go left, right, up, or down 
                is 1. It takes one action to go left or right. 
            </p>
            <p>
                Learn more about A* on <a href="https://en.wikipedia.org/wiki/A*_search_algorithm">
                    wikipedia.
                </a>
            </p>
            <h5>What is a heuristic?</h5>
            <p>
                A heuristic gives an estimate of how far the goal is relative to each state. 
                In this demo our heuristic is the euclidean distance to the goal.
            </p>
            <p>
                Learn more about heuristics on <a href="https://en.wikipedia.org/wiki/Heuristic">
                    wikipedia.
                </a>
            </p>
            <p>
                Check out the code <a href="https://github.com/jericosalvador/A-Star-Search">
                    here.
                </a>
            </p>

        </div>
    )
}
