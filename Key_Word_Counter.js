/**
 * Created by User on 11/11/2017.
 */

function arraySearch(lst, word) {

    for (i = 0; i < lst.length; i++) {

       if (lst[i][0] == word) {

            return i

       }

    }

    return false

}


function track(lst, word) {

    if (!arraySearch(lst, word)) {

        lst.push([word, 1])
        return lst

    }

    else {

        lst[arraySearch(lst, word)][1] += 1
        return lst

    }

}
