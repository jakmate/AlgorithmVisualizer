#include <SFML/Graphics.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <algorithm> // for std::max_element

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
    SELECTION_SORT
};

// Function to render the menu and capture user selection
Algorithm renderMenu(sf::RenderWindow& window) {
    // Define the menu options
    std::vector<std::string> options = { "Bubble Sort", "Selection Sort" };
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
                    return static_cast<Algorithm>(selectedOption + 1); // +1 to match Algorithm enum
                }
            }
        }

        // Clear window and display the menu options
        window.clear(sf::Color::Black);

        sf::Vector2u windowSize = window.getSize();
        float yOffset = windowSize.y / (options.size() + 1);  // Vertical spacing between menu items

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

void drawArray(sf::RenderWindow& window, const std::vector<int>& arr) {
    float barWidth = window.getSize().x / arr.size();
    float maxHeight = window.getSize().y * 0.8f;  // Keep some space at the top
    int maxElement = *std::max_element(arr.begin(), arr.end());

    for (size_t i = 0; i < arr.size(); ++i) {
        float barHeight = (arr[i] / static_cast<float>(maxElement)) * maxHeight;
        sf::RectangleShape bar(sf::Vector2f(barWidth, barHeight));
        bar.setPosition(i * barWidth, window.getSize().y - barHeight);
        bar.setFillColor(sf::Color::Cyan);
        window.draw(bar);
    }
}

void bubbleSort(std::vector<int>& arr, sf::RenderWindow& window) {
    int n = arr.size();
    bool swapped;

    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;

                window.clear();
                // Draw the array
                drawArray(window, arr);
                window.display();

                sf::sleep(sf::milliseconds(100));  // Slow down the sorting process for visualization
            }
        }
        if (!swapped)
            break;
    }

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
                return;  // Exit the function and return to the main menu
            }
        }

        // Clear window and redraw the sorted array and the message
        window.clear();
        drawArray(window, arr);  // Draw the final sorted array
        window.draw(message);     // Draw the message
        window.display();
    }
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
            inputData = { 10, 50, 30, 20, 60, 40, 25, 10, 55, 65 };  // You can replace this with actual input logic
            if (!inputData.empty()) {
                appState = AppState::VISUALIZE;
            }
            break;

        case AppState::VISUALIZE:
            if (selectedAlgorithm == Algorithm::BUBBLE_SORT) {
                bubbleSort(inputData, window);
            }
            // Add other algorithms here
            appState = AppState::MENU; // Move back to the main menu after returning from bubbleSort
            break;
        }
    }

    return 0;
}
