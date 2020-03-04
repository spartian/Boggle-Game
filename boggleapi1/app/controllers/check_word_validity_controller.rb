require 'json'
class CheckWordValidityController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    
  end
  def inputword
    x = ""
    @word = params[:wordEntered]
    url = URI("https://api.dictionaryapi.dev/api/v1/entries/en/"+""+@word)
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(url)
    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
     
      @arrayOfRemovedRowsAndColumns = JSON.parse(params[:indexesArray])
      @objArray = []
      if @arrayOfRemovedRowsAndColumns.length == 1
        
        x = "The word is valid"
        render :json => {:name => x}    
        #check it with open word api
        # render :json => {:name => "word is not valid"}
      
      elsif @arrayOfRemovedRowsAndColumns.length > 1
        @arrayContained = @arrayOfRemovedRowsAndColumns
        @len = @arrayOfRemovedRowsAndColumns.length- 1
        @i = 0
        for @i in @i..@len
          @pushedArray1 = []
          for @j in 0..@arrayContained[@i].length - 1
            @pushedArray = []
            @pushedArray.push(@arrayContained[@i][@j]["row"],@arrayContained[@i][@j]["column"])
            @pushedArray1.push(@pushedArray)
          end
          @objArray.push(@pushedArray1)
        end
      end
        
      result = arrayManipulation(@objArray)
      x = "The pattern is #{result}"
    else
      x = "The word is not valid"
    end
    render :json => {:name => x}
  end

  def arrayManipulation(objArray)
    instanceVariableArray =  Array.new(objArray.length)
    arrayOfDifference1 = []
    for i in 0..objArray.length - 1
      instance_variable_set "@variable_#{i}".to_sym, objArray[i]
      instanceVariableArray[i] = instance_variable_get "@variable_#{i}"
    end
    for j in 0..instanceVariableArray.length - 1
      k = j + 1
      if k < instanceVariableArray.length
        arrayOfDifference1.push(performComputation(instanceVariableArray[j],instanceVariableArray[k]))
        arrayOfDifference1.push({})
      else
        arrayOfDifference1.pop()
        break
      end
    end
  result = checkIfTheSelectedLettersAreInPattern(arrayOfDifference1)

  result

  end

  

  def performComputation(firstLetterArray,secondLetterArray)
    arrayOfDifference1 = []
    for i in 0..firstLetterArray.length - 1
      instanceOfFirstLetter = firstLetterArray[i]
      for j in 0..secondLetterArray.length - 1
          instanceOfSecondLetter = secondLetterArray[j]
          # copyOfInstanceOfFirstLetter.reject!{|e| ((instanceOfFirstLetter[0] -instanceOfSecondLetter[0])).abs <= 1 && ((instanceOfFirstLetter[1] -instanceOfSecondLetter[1])).abs <= 1 }
          if (instanceOfFirstLetter[0]-instanceOfSecondLetter[0]).abs <= 1 and (instanceOfFirstLetter[1]-instanceOfSecondLetter[1]).abs <= 1
            differenceBetweenRows = (instanceOfFirstLetter[0]-instanceOfSecondLetter[0]).abs
            differenceBetweenCols = (instanceOfFirstLetter[1]-instanceOfSecondLetter[1]).abs
            arrayOfDifference1.push({instanceOfFirstLetterText: instanceOfFirstLetter, instanceOfSecondLetterText:instanceOfSecondLetter, rowAndColumnDifference: [differenceBetweenRows,differenceBetweenCols] })
          else
            print("2")
          end
        # else
        #   print("Number of instance of first letter is completed")
        
      end
    end
    
   arrayOfDifference1
  end

  def checkIfTheSelectedLettersAreInPattern(arrayOfDifference1)
    arrayOfLetter = []
    arrayOfDifference1Copy = Marshal.load(Marshal.dump(arrayOfDifference1))
    arrayOfDifference1.each{|x| x.reject! { |h| h[:rowAndColumnDifference] == [0,0]}}  
    arrayOfSecondLetters = []
    arrayOfFirstLetters = []
    arrayOfMatches = []
    x = :instanceOfSecondLetterText
    flag = false
    items = []
    countForIndex = 1
    filteredArrayToBePushedInto = []
    emptyArray = ""
    j = -1
    count = 0
    arrayOfDifference1.each {|arrayOfDifference1_1|
      if(arrayOfDifference1_1.empty? == true)
        j = j + 1
        instance_variable_set "@variableArray_#{j}".to_sym,"flag"
      else
      arrayOfDifference1_1.each{|arrayOfDifference1_1_1|
        j = j + 1
        instance_variable_set "@variableArray_#{j}".to_sym, arrayOfDifference1_1_1
        count = count + 1
    }
      end
  }
  

  arr1 =  Array.new(count+1) {}
  for i in 0..count + 1
    a = instance_variable_get "@variableArray_#{i}"
    if a.nil? == false
      arr1[i] = instance_variable_get "@variableArray_#{i}"  
    end
     
  end


  # arr1 =  arr1.map{|e| e.nil? ? 'flag' : e}
  # scores.delete_if {|score| score < 80 } 
  arr1 = arr1.delete_if{|e| e == nil}
  arrayOfIndex = arr1.each_index.select{|i| arr1[i] == 'flag'}
  # arr1 = arr1.reject!{|i| i == nil}
  arr2 = Marshal.load(Marshal.dump(arr1))
  resultArray = []
  resultArray1 = []
  y = :instanceOfSecondLetterText
  counter = 0
  indexesToBePushedArray = []
  secondIndex = []
  firstIndex = []
  remainingElement = []
  flagForWordLength = false
  result1 = false
  if ((@word.length == 2 || @word.length == 3) && arrayOfIndex.length != 0)

    arr1.delete_if.with_index { |x, i| i > arrayOfIndex[0] and i<=arrayOfIndex[arrayOfIndex.length - 1] }
    arrayOfIndex = arr1.each_index.select{|i| arr1[i] == 'flag'}
  
  elsif((@word.length == 2 || @word.length == 3) && arrayOfIndex.length == 0)
    arr1.insert(-1,'flag')
    arrayOfIndex = arr1.each_index.select{|i| arr1[i] == 'flag'}
  end
  arrayOfIndex.each_with_index{ |val,index|
    counter = counter + 1
    if counter % 2 == 0
      y=:instanceOfFirstLetterText
    else
      y =:instanceOfSecondLetterText
    end
    
    arr1.select.with_index{|val1,index1|
      if index1 >=0 && index1 < val && counter % 2 != 0 && arr1[index1].empty? == false
        if val1 != 'flag'
          resultArray.push(val1[y])
          arr1[index1] = {}
          secondIndex.push(index1)
        end
      elsif index1 >=0 && index1 < val && counter % 2 == 0 && arr1[index1].empty? == false
        if val1 != 'flag'
          resultArray1.push(val1[y])
          arr1[index1] = {}
          firstIndex.push(index1)
        end
      end
      }
      
      if resultArray.length != 0 and resultArray1.length != 0
        indexesToBePushedArray = resultOperation2(resultArray,resultArray1,secondIndex,firstIndex)
        resultArray1 = []
        resultArray = []
        secondIndex = []
        firstIndex = []
      
      elsif resultArray.length == 0 and resultArray1.length == 0 
        indexesToBePushedArray = []
      
      else
        if @word.length == 3 || @word.length == 2
          assignmentArrayIndex = resultOperation1(resultArray,resultArray1,arr2,secondIndex,firstIndex)
          remainingElement = arr1[(val+1)..-1]
          indexesToBePushedArray = checkIfRemainingElementsArePresent2(assignmentArrayIndex,remainingElement,arr2)
          result1 = calculationToBeDoneForTwoOrThreeLetters(indexesToBePushedArray,arr2)
          flagForWordLength = true
          indexesToBePushedArray.uniq!
        end
      end
      if flagForWordLength == false
        remainingElement = arr1[(val+1)..-1]
      end
  }
  if flagForWordLength == false
    if indexesToBePushedArray.length == 0
      result = false
    else 
      if flagForWordLength == false
        result = checkIfRemainingElementsArePresent(remainingElement,indexesToBePushedArray,arr1,arr2)
      else
        result = true
      end
    end
  else
    result = result1
  end
  result
  end

  def calculationToBeDoneForTwoOrThreeLetters (indexesToBePushedArray,arr2)
    matchedLetters = []
    indexesToBePushedArray.each_with_index {|val6,index6|
    
    checkForReverseIndex_0 = arr2.values_at(val6[:first])[0][:instanceOfFirstLetterText]
    checkForReverseIndex_1 = arr2.values_at(val6[:first])[0][:instanceOfSecondLetterText]
    
    if val6[:second] != ""
    checkForReverseIndex_2 = arr2.values_at(val6[:second])[0][:instanceOfFirstLetterText]
    checkForReverseIndex_3 = arr2.values_at(val6[:second])[0][:instanceOfSecondLetterText]
         
    if ((checkForReverseIndex_1 == checkForReverseIndex_2)  and (checkForReverseIndex_0 == checkForReverseIndex_3))
      # do nothing
      print "empty"
    else
      matchedLetters.push(arr2.values_at(val6[:first],val6[:second]))
    end
    else
      matchedLetters.push(arr2.values_at(val6[:first]))
    end
    }

    if matchedLetters.empty?
      result = false
    else
      result =  checkForMatchedLetters(matchedLetters)
    end


  end

  def checkIfRemainingElementsArePresent2(assignmentArrayIndex,remainingElement,arr2)
    requiredArray = []
    counter_index = 1
    assignmentArrayIndex.each_with_index { |val_00,index_00|
      if remainingElement.length != 0 && remainingElement[0] != 'flag'
      remainingElement.each_with_index {|val_01,index_01|
       if arr2[val_00] != 'flag' and arr2[val_00][:instanceOfSecondLetterText] == val_01[:instanceOfFirstLetterText] 
        requiredArray.push(({"first": val_00, "second": arr2.index{|x| 
          x == val_01 }}))
       end
      }
    elsif assignmentArrayIndex.length == 1
      requiredArray.push({"first": val_00,"second": ""})

    elsif assignmentArrayIndex.length > 1
      if counter_index < assignmentArrayIndex.length
        requiredArray.push({"first": val_00,"second": assignmentArrayIndex[counter_index]})
        counter_index = counter_index + 1
      end
      
    end
    }
    requiredArray
  end
  
  def resultOperation1(resultArray,resultArray1,arr2,secondIndex,firstIndex)
    assignmentArray = []
    
  if resultArray.length != 0
    assignmentArray = resultArray
    assignmentArray = resultOperation4(secondIndex)
  end

  if resultArray1.length != 0 and resultArray.length != 0
    assignmentArray = resultOperation2(resultArray,resultArray1,secondIndex,firstIndex)
  end 
  assignmentArray
  end
  
  def resultOperation4(index)
    indexesToBePushedArray = []    
    for i in 0..index.length - 1  
      indexesToBePushedArray.push(index[i])
    end
  indexesToBePushedArray
  end

  def resultOperation2(resultArray,resultArray1,secondIndex,firstIndex)
    indexesToBePushedArray = []
    if resultArray.length == 1 and resultArray1.length == 1
      differenceInValue = resultArray1 - resultArray
      if (differenceInValue.length == 0 and resultArray1 == resultArray1)
        indexesToBePushedArray.push({"first": secondIndex[0],"second": firstIndex[0]})
      
      else
        #delete the index from array
      end
      
    else
      
      indexOfSecondArray = -1
      indexOfFirstArray = -1
      if resultArray.length > resultArray1.length
        resultArray.each_with_index {|val2,index2|
          indexOfSecondArray = indexOfSecondArray + 1
          indexOfFirstArray = -1
          resultArray1.each_with_index{|val3,index3|
            indexOfFirstArray = indexOfFirstArray + 1
          if ((val2 - val3).length == 0 and val2== val3)
            indexesToBePushedArray.push({"first":secondIndex[indexOfSecondArray],"second": firstIndex[indexOfFirstArray]})         
          end
        
        }

        }
      elsif resultArray.length < resultArray1.length

        resultArray1.each_with_index {|val4,index2|
          indexOfFirstArray = indexOfFirstArray + 1
          indexOfSecondArray = -1
          resultArray.each_with_index{|val5,index3|
            indexOfSecondArray = indexOfSecondArray + 1
          if ((val4 - val5).length == 0 and val4 == val5)
            indexesToBePushedArray.push({"first":secondIndex[indexOfSecondArray],"second": firstIndex[indexOfFirstArray]})
          end
        
        }

        }
        #both are equal in size
      else 
        resultArray1.each_with_index {|val4,index2|
          indexOfFirstArray = indexOfFirstArray + 1
          indexOfSecondArray = -1
          resultArray.each_with_index{|val5,index3|
            indexOfSecondArray = indexOfSecondArray + 1
          if ((val4 - val5).length == 0 and val4 == val5)
            indexesToBePushedArray.push({"first":secondIndex[indexOfSecondArray],"second": firstIndex[indexOfFirstArray]})
          end
        }
        }
        indexesToBePushedArray.push("WorkDone Second and First Letter")
      end
    end
    indexesToBePushedArray
  end

  def checkIfRemainingElementsArePresent(remainingElement,indexesToBePushedArray,arr1,arr2)
    matchedLetters = []
    resultantArray = []
    if remainingElement.length == 0
      print "No elements remaining"
      print "invalid comnbination of letters" 
    else
      remainingElement.each_with_index{|val5,index5|
       indexesToBePushedArray.each_with_index {|val6,index6|
        matchedObject = []
        if val6 != "WorkDone Second and First Letter"
          elem1 = arr2[val6[:second]][:instanceOfSecondLetterText] 
          elem2 = val5[:instanceOfFirstLetterText]
          # i = 0
          if (elem1 - elem2).length ==0 and (elem1==elem2)
            
            checkForReverseIndex_0 = arr2.values_at(val6[:first])[0][:instanceOfFirstLetterText]
            checkForReverseIndex_1 = arr2.values_at(val6[:first])[0][:instanceOfSecondLetterText]
            checkForReverseIndex_2 = arr2.values_at(val6[:second])[0][:instanceOfFirstLetterText]
            checkForReverseIndex_3 = arr2.values_at(val6[:second])[0][:instanceOfSecondLetterText]

            if ((checkForReverseIndex_1 == checkForReverseIndex_2)  and (checkForReverseIndex_0 == checkForReverseIndex_3))
              #donothing
              print "empty"
            else
              matchedLetters.push(arr2.values_at(val6[:first],val6[:second]))
              lastIndex = matchedLetters.length - 1
              flag = true
              for j in 0..matchedLetters[lastIndex].length - 1
              checkForReverseIndex_4 =  matchedLetters[lastIndex][j][:instanceOfSecondLetterText]
              checkForReverseIndex_5 = matchedLetters[lastIndex][j][:instanceOfFirstLetterText]

              if val5[:instanceOfSecondLetterText] == checkForReverseIndex_5 and val5[:instanceOfFirstLetterText] == checkForReverseIndex_4 
                #do nothing
                flag = false
                break
              else
              end
              end
              if flag == true
                matchedLetters[lastIndex].append(val5)
              else
                #do nothing
                print "do nothing"
              end
            end
       end
      end
       }
      }
    end
    if matchedLetters.empty?
      result = false
    else
      result =  checkForMatchedLetters(matchedLetters)
    end
    result
  end

  def checkForMatchedLetters(matchedLetters)
    result1 = false
    matchedLetters.each_with_index { |val_0,index_0|
      for i in 0..val_0.length - 1
        if i < val_0.length - 1
          if ((val_0[i][:instanceOfFirstLetterText] == val_0[i+1][:instanceOfFirstLetterText]) && (val_0[i][:instanceOfSecondLetterText] == val_0[i+1][:instanceOfSecondLetterText]))
            #make the duplicate empty
            matchedLetters[index_0][i] = {}
          end
        end
      end
    }
    
    matchedLettersCopy = Marshal.load(Marshal.dump(matchedLetters))
    if @word.length == 3 or @word.length == 4
      matchedLetters.each_with_index { |val7,index7|
      if val7.nil? == false
        len1 = val7.length
        counter_1 = 1
        for indices1 in 0..val7.length - 1
          if counter_1 < val7.length
            
            if ((val7[indices1][:instanceOfSecondLetterText] != val7[indices1+1][:instanceOfFirstLetterText]) or (((@word.length) !=  val7.length + 1 )))
             
            #discard this array
            matchedLetters[index7] = {}
              break
            else

            end
            counter_1 = counter_1 + 1
          end
        end
      end
    }
  result1 = checkIfThePatternsSelectedAreCorrect(matchedLetters)
  elsif @word.length == 2
    matchedLetters =  checkIfThePatternsSelectedAreCorrect2(matchedLetters)
    if matchedLetters.length > 0
      result1 = true
    end
  end
  result = result1
  result
  end

  def checkIfThePatternsSelectedAreCorrect2(matchedLetters)
    matchedLetters.each_with_index { |val8,index8|
       if val8.nil? == false
         len1 = val8.length
         a = val8[0][:instanceOfFirstLetterText]
         b = val8[0][:instanceOfSecondLetterText]
         difference_1 =  (a[0] - b[0])
         difference_2 =  (a[1] - b[1])

         if((difference_1 == 0 and difference_2 == -1) or (difference_1 == 0 and difference_2 == 1) )
            print "this is horizontal"


         elsif ((difference_1 == -1 and difference_2 == 0) or (difference_1 == 1 and difference_2 == 0))
            print "this is vertical"

         elsif ((difference_1 == 1 and difference_2 == 1) or(difference_1 == 1 and difference_2 == -1) or (difference_1 == -1 and difference_2 == 1) or (difference_1 == -1 and difference_2 == -1)) 
            print "this is diagonal"

        else
          matchedLetters[index8] = []
          break
        end
      end
      }
    matchedLetters.delete_if &:empty?
    matchedLetters
  end
  
  def checkIfThePatternsSelectedAreCorrect(matchedLetters)
    matchedLetters.delete_if &:empty?
    validCombinationOfLetter = true
    vertical_flag = false
    horizontal_flag = false
    diagonal_flag = false
    counter_var = 0
    matchedLetters.each_with_index { |val8,index8|
       if val8.nil? == false
         len1 = val8.length
         vertical_flag = false
         horizontal_flag = false
         diagonal_flag = false
         
         a = val8[0][:instanceOfFirstLetterText]
         b = val8[0][:instanceOfSecondLetterText]
         difference_1 =  (a[0] - b[0])
         difference_2 =  (a[1] - b[1])

         if((difference_1 == 0 and difference_2 == -1) or (difference_1 == 0 and difference_2 == 1) )
           if vertical_flag == false && diagonal_flag == false
           flag =  CheckForHorizontal(val8)
           horizontal_flag = true
           if flag == false
             horizontal_flag = true
             matchedLetters[index8] = []
           end
           
           elsif vertical_flag == true or diagonal_flag == true
             matchedLetters[index8] = []
             
           else
           matchedLetters[index8] = []
           break
           end
           
         elsif ((difference_1 == -1 and difference_2 == 0) or (difference_1 == 1 and difference_2 == 0))
           if horizontal_flag == false && diagonal_flag == false
           flag =  CheckForVertical(val8)
           vertical_flag = true
           if flag == false
             vertical_flag = true
             matchedLetters[index8] = []
           end
           elsif horizontal_flag == true or diagonal_flag == true
           matchedLetters[index8] = []
           

           else
             matchedLetters[index8] = []
             break
           end
         elsif ((difference_1 == 1 and difference_2 == 1) or(difference_1 == 1 and difference_2 == -1) or (difference_1 == -1 and difference_2 == 1) or (difference_1 == -1 and difference_2 == -1) )
           if vertical_flag == false && horizontal_flag == false
           flag =  CheckForDiagonal(val8)
           diagonal_flag = true
           if flag == false
             diagonal_flag = true
             matchedLetters[index8] = []
           end
         elsif vertical_flag == true or horizontal_flag == true
           matchedLetters[index8] = []
           
         else
           matchedLetters[index8] = []
           break
           end
         end
         counter_var = counter_var + 1
       end
    }
    resultantFinalBoolValue = resultOfPatternSelectedAreValidOrNot(matchedLetters)
    
    resultantFinalBoolValue
  end

  def resultOfPatternSelectedAreValidOrNot(matchedLetters)
    valid_flag = false
    matchedLetters.delete_if &:empty?  
    if matchedLetters.length != 0
        valid_flag = true
    end
    
    if valid_flag == true
      true
    else
      false
    end
  end

  def CheckForVertical(originalArray)
      for i in 0..originalArray.length - 1
       firstLetterDifference =  (originalArray[i][:instanceOfFirstLetterText][0] - originalArray[i][:instanceOfSecondLetterText][0]).abs
       firstLetterDifference_1 =  (originalArray[i][:instanceOfFirstLetterText][1] - originalArray[i][:instanceOfSecondLetterText][1]).abs
       
        if ((firstLetterDifference == -1 && firstLetterDifference_1 == 0) || (firstLetterDifference == 1 && firstLetterDifference_1 == 0)) 
          next
        else
          return false
        end
      end
      return true
      print "check  vertical"
  end 

  def CheckForHorizontal(originalArray)
      for i in 0..originalArray.length - 1
        firstLetterDifference =  (originalArray[i][:instanceOfFirstLetterText][0] - originalArray[i][:instanceOfSecondLetterText][0]).abs
        secondLetterDifference =  (originalArray[i][:instanceOfFirstLetterText][1] - originalArray[i][:instanceOfSecondLetterText][1]).abs
 
         if ((firstLetterDifference == 0 && secondLetterDifference == -1) || (firstLetterDifference ==0 && secondLetterDifference == 1)) 
          next 
          return true
         else
           return false
         end
       end
       return true
      print "check horizontal"
  end

  def CheckForDiagonal(originalArray)
      previous_diagonal_difference_1 = (originalArray[0][:instanceOfFirstLetterText][0] - originalArray[0][:instanceOfSecondLetterText][0])
      previous_diagonal_difference_2 = (originalArray[0][:instanceOfFirstLetterText][1] - originalArray[0][:instanceOfSecondLetterText][1])

      for i in 1..originalArray.length - 1
        firstLetterDifference =  (originalArray[i][:instanceOfFirstLetterText][0] - originalArray[i][:instanceOfSecondLetterText][0])
        secondLetterDifference =  (originalArray[i][:instanceOfFirstLetterText][1] - originalArray[i][:instanceOfSecondLetterText][1])
 
         if (previous_diagonal_difference_1 == firstLetterDifference && previous_diagonal_difference_2 == secondLetterDifference) 
          next 
          return true
         else
           return false
         end
       end
       return true
      print "check  diagonal"
  end
  
     
  
  
  def pstinputword
      @word1 = params[:wordEntered]
  end

end