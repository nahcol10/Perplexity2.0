# Perplexity-2.O

A conversational AI agent with web search capabilities powered by Google's Gemini 2.0 model and LangGraph. This project demonstrates how to build an AI assistant that can search the internet for information and provide responses based on up-to-date information.

## Features

- Conversational AI using Google's Gemini 2.0 Flash model
- Web search capabilities through Tavily Search API
- Structured agent workflow using LangGraph
- Checkpoint memory for conversation history
- Asynchronous processing and streaming responses
- Type-safe implementation with Python type annotations

## Prerequisites

- Python 3.8+
- API keys for:
  - Google AI (Gemini)
  - Tavily Search

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nahcol10/Perplexity2.0
   cd Perplexity2.0
   ```

2. Install the required packages:
   ```bash
   pip install langgraph langchain-google-genai langchain-community python-dotenv
   ```

3. Create a `.env` file in the project root with your API keys:
   ```
   GOOGLE_API_KEY=your_google_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

## Usage

The project is structured as a python file as well as in  Jupyter notebook (`app.ipynb`) that you can run cell by cell.

### Basic Usage

```python
response = await graph.ainvoke({
    "messages": [HumanMessage(content="Who won the last World Cup?")]
})
```

### Streaming Events

```python
events = graph.astream_events(input={"messages": [HumanMessage(content="What are the latest AI advancements?")]}, version="v2")

async for event in events:
    print(event)
```

## Architecture

The agent is built using LangGraph's StateGraph, which organizes the flow of information:

1. User messages are processed by the Gemini 2.0 model
2. If the model identifies a need for additional information, it calls the Tavily search tool
3. Search results are returned to the model
4. The model generates a final response based on the search results

The graph structure is visualized in the notebook using Mermaid diagrams, showing the flow between:
- Model node: Processes messages with the LLM
- Tool router: Determines if a tool call is needed
- Tool node: Executes web searches and returns results

## Demo
[![Perplexity-2O Demo](https://img.youtube.com/vi/wGAKuV7wHE0/0.jpg)](https://youtu.be/wGAKuV7wHE0)

You can watch the demo video [here](https://youtu.be/wGAKuV7wHE0).

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
