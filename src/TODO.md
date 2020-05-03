1. Jobs application feature

2. Refactor all the ternary's into if blocks

3. Refactor all the mapping to take place outside of the return and assing it to a const with good name

4. More friendly error handling

5. Destructure throughout

6. Docstrings throughout

7. Fix authentication in backend to refactor so that there's a single authenticate middleware? Explore using  a library

8. useCommas to format salaries

9. Deploy



### questions

- If I want to be able to re-render page upon clicking on apply, should I have a separate useEffect or just callmy callback inside the component?

- appliedJobs as a set? Is it ineffecient to be redefining this each time JobsList is rendered?

- In Jobs, why hasn't jobsList state updated when I try console logging it right after setting it in the same code block