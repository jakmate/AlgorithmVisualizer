#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Enumeration for application state
enum class AppState {
    MENU,
    INPUT,
    VISUALIZE
};

// Enumeration for algorithm choice
enum class Algorithm {
    NONE,
    BUBBLE_SORT,
    INSERTION_SORT,
    SELECTION_SORT,
    MERGE_SORT,
    QUICK_SORT
};

// Function to render the menu and capture user selection
Algorithm renderMenu(sf::RenderWindow& window) {
    // Define the menu options
    std::vector<std::string> options = { "Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort", "Quick Sort" };
    int selectedOption = 0;

    sf::Font font;
    if (!font.loadFromFile("arial.ttf")) {
        std::cerr << "Error loading font" << std::endl;
        return Algorithm::NONE;
    }

    // Main loop for the menu
    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();

            if (event.type == sf::Event::KeyPressed) {
                if (event.key.code == sf::Keyboard::Up) {
                    selectedOption = (selectedOption - 1 + options.size()) % options.size();
                } else if (event.key.code == sf::Keyboard::Down) {
                    selectedOption = (selectedOption + 1) % options.size();
                } else if (event.key.code == sf::Keyboard::Enter) {
                    // +1 to match Algorithm enum
                    return static_cast<Algorithm>(selectedOption + 1);
                }
            }
        }

        // Clear window and display the menu options
        window.clear(sf::Color::Black);

        sf::Vector2u windowSize = window.getSize();
        // Vertical spacing between menu items
        float yOffset = windowSize.y / (options.size() + 1);

        for (size_t i = 0; i < options.size(); ++i) {
            sf::Text text;
            text.setFont(font);
            text.setString(options[i]);
            text.setCharacterSize(30);
            text.setFillColor(i == selectedOption ? sf::Color::Red : sf::Color::White);

            // Position text items based on the current window size
            text.setPosition(windowSize.x / 2 - text.getGlobalBounds().width / 2, yOffset * (i + 1));

            window.draw(text);
        }

        window.display();
    }

    return Algorithm::NONE;
}

void drawArray(sf::RenderWindow& window, const std::vector<int>& arr, int highlightedIndex1 = -1, int highlightedIndex2 = -1) {
    sf::Font font;
    if (!font.loadFromFile("arial.ttf")) {
        std::cerr << "Error loading font" << std::endl;
        return;
    }

    // Size of each number
    float textSize = 30.0f;
    // Horizontal space between numbers
    float xOffset = window.getSize().x / arr.size();

    for (size_t i = 0; i < arr.size(); ++i) {
        sf::Text numberText;
        numberText.setFont(font);
        numberText.setString(std::to_string(arr[i]));
        numberText.setCharacterSize(textSize);

        // Highlight the elements being compared or swapped
        if (static_cast<int>(i) == highlightedIndex1 || static_cast<int>(i) == highlightedIndex2) {
            numberText.setFillColor(sf::Color::Red);
        } else {
            numberText.setFillColor(sf::Color::White);
        }

        // Position each number text horizontally based on its index
        numberText.setPosition(i * xOffset + (xOffset / 2) - numberText.getGlobalBounds().width / 2, window.getSize().y / 2);

        window.draw(numberText);
    }
}

void drawEndMessage(sf::RenderWindow& window, const std::vector<int>& arr) {
    // Display message to press Enter
    sf::Font font;
    if (!font.loadFromFile("arial.ttf")) {
        std::cerr << "Error loading font" << std::endl;
    }

    sf::Text message;
    message.setFont(font);
    message.setString("Press Enter to return to the main menu");
    message.setCharacterSize(24);
    message.setFillColor(sf::Color::White);
    message.setPosition(window.getSize().x / 2 - message.getGlobalBounds().width / 2, 50);

    // Wait for the Enter key press
    while (window.isOpen()) {
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed)
                window.close();

            if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Enter) {
                return;
            }
        }

        // Clear window and redraw the sorted array and the message
        window.clear();
        drawArray(window, arr);
        window.draw(message);
        window.display();
    }
}

void bubbleSort(std::vector<int>& arr, sf::RenderWindow& window) {
    int n = arr.size();
    bool swapped;

    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap the elements
                std::swap(arr[j], arr[j + 1]);
                swapped = true;

                window.clear();
                // Draw the array and highlight the swapped elements
                drawArray(window, arr, j, j + 1);
                window.display();

                sf::sleep(sf::milliseconds(300));
            }
        }
        if (!swapped)
            break;
    }

    drawEndMessage(window, arr);
}

void insertionSort(std::vector<int>& arr, sf::RenderWindow& window) {
    int n = arr.size();

    for (int i = 1; i < n; i++) {
        int j = i - 1;
        int val = arr[i];
        while (j >= 0 && arr[j] > val) {
            arr[j + 1] = arr[j];
            j = j - 1;

            window.clear();
            // Draw the array and highlight the element being inserted
            drawArray(window, arr, j + 1, i);
            window.display();

            sf::sleep(sf::milliseconds(300));
        }
        arr[j + 1] = val;

        window.clear();
        // Draw the array and highlight the element being placed at its correct position
        drawArray(window, arr, j + 1, i);
        window.display();

        sf::sleep(sf::milliseconds(300));
    }

    drawEndMessage(window, arr);
}

void selectionSort(std::vector<int>& arr, sf::RenderWindow& window) {
    int n = arr.size();

    for (int i = 0; i < n - 1; i++) {
        int index = i;
        for (int j = i + 1; j < n; j++) {

            window.clear();
            // Highlight the selected and current element
            drawArray(window, arr, i, j);
            window.display();

            if (arr[index] > arr[j]) {
                index = j;
            }
        }
        // Swap if a smaller element was found
        if (index != i) {
            std::swap(arr[i], arr[index]);
        }

        window.clear();
        // Highlight the swapped elements
        drawArray(window, arr, i, index);
        window.display();

        sf::sleep(sf::milliseconds(300));
    }
    for (int num : arr) std::cout << num << " ";

    drawEndMessage(window, arr);
}

void mergeSort(std::vector<int>& arr, sf::RenderWindow& window) {
    for (int num : arr) std::cout << num << " ";
}

void partition(std::vector<int>& arr, sf::RenderWindow& window) {
    int n = arr.size();

    // Base case
    if (n <= 1) {
        return;
    }

    int mid = n / 2;
    int pivot = arr[mid];

    std::vector<int> low, high;

    window.clear();
    drawArray(window, arr, -1, mid);
    window.display();
    sf::sleep(sf::milliseconds(300));

    // Partition the array into low and high based on the pivot
    for (int i = 0; i < n; i++) {
        if (i != mid){
            if (arr[i] <= pivot) {
                low.push_back(arr[i]);
            } else {
                high.push_back(arr[i]);
            }
        }
    }

    // Recursively sort the low and high partitions
    partition(low, window);
    partition(high, window);

    // Reconstruct the original array
    arr = std::move(low); // Move sorted low elements to arr
    arr.push_back(pivot);
    arr.insert(arr.end(), high.begin(), high.end());

    // Visualization logic to show the combined array
    window.clear();
    drawArray(window, arr, -1, -1);
    window.display();
    sf::sleep(sf::milliseconds(500));
}

void quickSort(std::vector<int>& arr, sf::RenderWindow& window) {
    partition(arr, window);
    drawEndMessage(window, arr);
}

int main() {
    sf::RenderWindow window(sf::VideoMode(800, 600), "Algorithm Visualizer", sf::Style::Resize | sf::Style::Close);

    AppState appState = AppState::MENU;
    Algorithm selectedAlgorithm = Algorithm::NONE;
    std::vector<int> inputData;

    while (window.isOpen()) {
        switch (appState) {
        case AppState::MENU:
            selectedAlgorithm = renderMenu(window);
            if (selectedAlgorithm != Algorithm::NONE) {
                appState = AppState::INPUT;
            }
            break;

        case AppState::INPUT:
            // Simulated input data for demonstration
            inputData = { 10, 50, 30, 20, 60, 40, 25, 10, 55, 65 };
            if (!inputData.empty()) {
                appState = AppState::VISUALIZE;
            }
            break;

        case AppState::VISUALIZE:
            if (selectedAlgorithm == Algorithm::BUBBLE_SORT) {
                bubbleSort(inputData, window);
            }
            if (selectedAlgorithm == Algorithm::INSERTION_SORT) {
                insertionSort(inputData, window);
            }
            if (selectedAlgorithm == Algorithm::SELECTION_SORT) {
                selectionSort(inputData, window);
            }
            if (selectedAlgorithm == Algorithm::MERGE_SORT) {
                mergeSort(inputData, window);
            }
            if (selectedAlgorithm == Algorithm::QUICK_SORT) {
                quickSort(inputData, window);
            }

            // Move back to the main menu after returning from sorting
            appState = AppState::MENU;
            break;
        }
    }

    return 0;
}