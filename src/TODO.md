1. Remove console logs

2. Refactor all the ternary's into if blocks

3. Refactor all the mapping to take place outside of the return and assing it to a const with good name

4. More friendly error handling

5. Destructure throughout

6. Docstrings throughout (formatted with /** */)

7. Fix authentication in backend to refactor so that there's a single authenticate middleware? Explore using  a library

8. useCommas to format salaries

9. useLocalStorage custom hook

10. update Jobs and Company so that I don't reuse applyToJob (maybe define that in a helper or pass it down from higher up)

12. Add a page / component for seeing the jobs you've applied to

13. fix private route so we're not rendering children directly?

14. live search bar

15. structure the folders so that git repo is at top level holding front and backend

16. add company name to JobCard

17. pagination

20. Deploy



### questions

- If I want to be able to re-render page upon clicking on apply, should I have a separate useEffect or just callmy callback inside the component?

- appliedJobs as a set? Is it ineffecient to be redefining this each time JobsList is rendered?

- In Jobs, why hasn't jobsList state updated when I try console logging it right after setting it in the same code block

- Should I have appliedJobs in context / state, or props passed down from higher up?