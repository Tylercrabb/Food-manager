 import {API_KEY} from '../config'
 
export const FETCH_FRIDGE_SUCCESS = 'FETCH_FRIDGE_SUCCESS';

export const fetchFridgeSuccess = items => ({
    type: FETCH_FRIDGE_SUCCESS,
    items
});

export const fetchFridgeInventory = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`https://fridgeapp-backend.herokuapp.com/api/item`,{
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })

        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(items => {
            dispatch(fetchFridgeSuccess(items));
            
        });
    }

export const FETCH_PANTRY_SUCCESS = 'FETCH_PANTRY_SUCCESS';

export const fetchPantrySuccess = items => ({
    type: FETCH_PANTRY_SUCCESS,
    items
});

export const fetchPantryInventory = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`https://fridgeapp-backend.herokuapp.com/api/pantry`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
        return res.json()
        })
        .then(items => {
            dispatch(fetchPantrySuccess(items));
            
        });
    }

export const DELETE_PANTRY_ITEM_SUCCESS = 'DELETE_PANTRY_ITEM_SUCCESS';

export const deletePantryItemSuccess = items => ({
    type: DELETE_PANTRY_ITEM_SUCCESS,
    items
});

    export const deletePantryItem = (item) => (dispatch, getState) => {
        const authToken = getState().auth.authToken;
        
        return fetch(`https://fridgeapp-backend.herokuapp.com/api/pantry/${item.id}`, {
            method: 'DELETE',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res
            })
            .then( ()=> {
                dispatch(deletePantryItemSuccess(item.id));
            })
        }
        

export const DELETE_FRIDGE_ITEM_SUCCESS = 'DELETE_FRIDGE_ITEM_SUCCESS';

export const deleteFridgeItemSuccess = items => ({
    type: DELETE_FRIDGE_ITEM_SUCCESS,
    items
});

    export const deleteFridgeItem = (item) => (dispatch, getState) => {
        const authToken = getState().auth.authToken;
        
       return fetch(`https://fridgeapp-backend.herokuapp.com/api/item/${item.id}`, {
            method: 'DELETE',
            headers: {
                // Provide our auth token as credentials
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                
            })
            .then( ()=> {
                dispatch(deleteFridgeItemSuccess(item.id));
            })
        }

export const GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS';

export const getRecipeSuccess = results => ({
    type: GET_RECIPES_SUCCESS,
    results
});

    export const getRecipes = () => (dispatch, getState) => {
        function getNames(arr){
            let results = [];
            for(let i = 0; i < arr.length; i++){
                results.push(arr[i].itemName)
            }return results
        }
        let fridgeInvNames = getNames(getState().food.fridgeInventory) 
        let pantryInvNames = getNames(getState().food.pantryInventory) 
        let totalInv = fridgeInvNames.concat(pantryInvNames);
        let query = totalInv.join('%2C');
        
       return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${query}`, {
            method: 'GET',
            
            headers: {
                'X-RapidAPI-Key': API_KEY
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json()
            })
            .then( results => {
                dispatch(getRecipeSuccess(results))
            })
        }

            
        
           